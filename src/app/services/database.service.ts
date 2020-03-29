import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { SQLitePorter } from '@ionic-native/sqlite-porter/ngx';
import { HttpClient } from '@angular/common/http';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { BehaviorSubject, Observable } from 'rxjs';
 
export interface Reg {
  id: number,
  lote: string,
  kilos: any[],
  camion: number,
  patente:string,
  fecha:string,
  tipo:string,
  total:number,
  enviado:boolean
}
 
export interface GroupedByfecha {
  key?: string;
  regs?: Reg[];
}

export interface Regbyfecha {
  fecha: string,
  enviar:boolean,
  registros: {
    id: number,
    lote: string,
    kilos: any[],
    camion: number,
    patente: string,
    fecha: string,
    tipo: string,
    total: number,
    enviado: boolean
  }
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private database: SQLiteObject;
  private dbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
 
  registros = new BehaviorSubject([]);
  
  constructor(private plt: Platform, private sqlitePorter: SQLitePorter, private sqlite: SQLite, private http: HttpClient) {
    this.plt.ready().then(() => {
      this.sqlite.create({
        name: 'data.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.database = db;
          this.seedDatabase();
      });
    });
  }
 
  seedDatabase() {
    this.http.get('assets/seed.sql', { responseType: 'text'})
    .subscribe(sql => {
      this.sqlitePorter.importSqlToDb(this.database, sql)
        .then(_ => {
          this.loadRegistros();
          this.dbReady.next(true); 
        })
        .catch(e => console.error(e));
    });
  }
 
  getDatabaseState() {
    return this.dbReady.asObservable();
  }
 
  getRegs(): Observable<Reg[]> {
    return this.registros.asObservable();
  }
 
  loadRegistros() {
    return this.database.executeSql('SELECT * FROM registro ORDER BY fecha desc, lote, camion', []).then(data => {
      let registros: Reg[] = [];
 
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          let kilos = [];
          if (data.rows.item(i).kilos != '') {
            kilos = JSON.parse(data.rows.item(i).kilos);
          }
 
          registros.push({ 
            id: data.rows.item(i).id,
            lote: data.rows.item(i).lote, 
            kilos: kilos, 
            camion: data.rows.item(i).camion,
            fecha: data.rows.item(i).fecha,
            patente: data.rows.item(i).patente,
            tipo:data.rows.item(i).tipo,
            total:data.rows.item(i).total,
            enviado:data.rows.item(i).enviado
           });
        }
      }
      this.registros.next(registros);
    });
  }
 
  addRegistro() {
    let data = ['camion'];
    return this.database.executeSql('INSERT INTO registro (tipo) VALUES (?)', data).then(data => {
      return data.insertId;
    });
  }
 
  getRegistro(id): Promise<Reg> {
    return this.database.executeSql('SELECT * FROM registro WHERE id = ?', [id]).then(data => {
      let kilos = [];
      if (data.rows.item(0).kilos != '') {
        kilos = JSON.parse(data.rows.item(0).kilos);
      }
 
      return {
        id: data.rows.item(0).id,
        lote: data.rows.item(0).lote, 
        kilos: kilos, 
        camion: data.rows.item(0).camion,
        fecha: data.rows.item(0).fecha,
        patente: data.rows.item(0).patente,
        total:data.rows.item(0).total,
        tipo:data.rows.item(0).tipo,
        enviado:data.rows.item(0).enviado
      }
    });
  }
 
  deleteRegistro(id) {
    return this.database.executeSql('DELETE FROM registro WHERE id = ?', [id]).then(_ => {
      this.loadRegistros();
    });
  }
 
  async updateRegistro(reg: Reg) {
    let data = [reg.lote,reg.tipo, reg.total, reg.camion,reg.fecha,reg.patente, JSON.stringify(reg.kilos)];
    return this.database.executeSql(`UPDATE registro SET lote = ?, tipo=?, total=?, camion=?,fecha = ?,patente=? , kilos = ? WHERE id = ${reg.id}`, data).then(data => {
      this.loadRegistros();
    })
  }
 
}