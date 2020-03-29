import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { DatabaseService, Reg, GroupedByfecha, Regbyfecha } from '../services/database.service';
import { GroupByPipe } from 'ngx-pipes';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  groupedByfecha: GroupedByfecha;
  dataReturned: Array<Reg>;
  registros: Reg[] = [];
  regbyfecha: Regbyfecha[] = [];
  csvcontent:any;

  constructor(private db: DatabaseService, private router: Router, private groupby: GroupByPipe, private file: File, private plt: Platform, private socialSharing: SocialSharing) { }

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getRegs().subscribe(regs => {
          this.groupedByfecha = this.groupby.transform(regs, ['fecha', 'lote'], ' Lote:');
          this.regbyfecha = [];
          for (const property in this.groupby.transform(regs, ['fecha', 'lote'], ' Lote:')) {
            this.regbyfecha.push({
              fecha: property,
              enviar: false,
              registros: this.groupedByfecha[property]
            })
          };
        });
      }
    });
  }

  addRegistro() {

    this.db.addRegistro()
      .then(data => {
        this.router.navigateByUrl('/tabs/tab2/' + data);
      });
  };

  sendRegistros() {
    let csv: any = '';
    for (const property in this.regbyfecha) {
      if (this.regbyfecha[property].enviar) {
        csv += this.convertToCSV(this.regbyfecha[property]);
      };
    };
    if (this.plt.is("cordova")) {
      this.file.writeFile(this.file.dataDirectory, 'data.csv', csv, { replace: true }).then(res => {

        this.socialSharing.share('Registros de carga' + '\r\n' + csv, null, res.nativeURL, null);
      });
    }
  };

  convertToCSV(registro) {
    let line: any = ''
    line += 'Fecha y Lote' + '\r\n';
    line += registro.fecha + '\r\n';
    line += 'Fecha;Lote;Tipo;Camion;Patente/Bolson;Total' + '\r\n';
    registro.registros.forEach(element => {
      line += element.fecha + ',' + element.lote + ','+ element.tipo + ','+ element.camion + ',' + element.patente + ',' + element.total + '\r\n';
    });

    return line;
  }
}