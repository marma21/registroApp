import { Component, OnInit } from '@angular/core';
import { DatabaseService, Reg } from '../services/database.service';
import { ActivatedRoute, Router } from '@angular/router'
import { ToastController } from '@ionic/angular';
import { DatePipe} from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  providers:[DatePipe]
})
export class Tab2Page {
  
  selectedView = 'camion';
  dataReturned:any;
  registro: Reg=null;
  kilos:any[];
  totalkilos:number;

  constructor(public alertController: AlertController,private datePipe:DatePipe, private route: ActivatedRoute, private db: DatabaseService, private router: Router, private toast: ToastController) { 
  this.route.paramMap.subscribe(params => {
    let regId = params.get('id');

    this.db.getRegistro(regId).then(data => {
      this.registro = data;
      this.kilos = this.registro.kilos;
      this.totalkilos = this.kilos.reduce((a, b) => a + b, 0);
      this.selectedView=data.tipo;
    });
  });
}

ngOnInit() {
  
}

updateRegistro() {
  let kilos = this.kilos;
  this.registro.patente = this.registro.patente.toUpperCase();
  this.registro.kilos = kilos;
  this.registro.tipo=this.selectedView;
  this.registro.fecha = this.datePipe.transform(this.registro.fecha,'yyyy-MM-dd')
  this.db.updateRegistro(this.registro).then(async (res) => {
    let toast = await this.toast.create({
      message: 'Registro actualizado',
      duration: 3000
    });
    toast.present();
  });
}

deleteKilo(index){

  if(index > -1){
    this.kilos.splice(index, 1);
    this.registro.kilos = this.kilos;
    this.registro.total = this.kilos.reduce((a, b) => a + b, 0);
    this.db.updateRegistro(this.registro).then(async (res) => {
      let toast = await this.toast.create({
        message: 'Kilos eliminados',
        duration: 3000
      });
      toast.present();
    });
  };
}

delete() {
  this.db.deleteRegistro(this.registro.id).then(() => {
    this.router.navigateByUrl('/tabs/tab1');
  });
}

async presentAlertPrompt() {
  const alert = await this.alertController.create({
    header: 'Ingrese kilos',
    inputs: [
      {
        name: 'kilos',
        type: 'number',
        placeholder: 'Kilos'
      },
    ],
    buttons: [
      {
        text: 'Cancelar',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          
        }
      }, {
        text: 'Agregar',
        handler: (alertData) => {
          let kilosingresados:number = +alertData.kilos; 
          if (kilosingresados !== undefined && kilosingresados > 0 ) {
            this.kilos.push( kilosingresados );
            this.registro.total = this.kilos.reduce((a, b) => a + b, 0);
            this.updateRegistro();
          }
        }
      }
    ]
  });

  await alert.present();
}
}
