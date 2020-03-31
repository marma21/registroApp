import { Component, OnInit } from '@angular/core';
import { DatabaseService, Reg } from '../services/database.service';
import { ActivatedRoute, Router } from '@angular/router'
import { ModalController } from '@ionic/angular';
import { CargaModalPage } from '../carga-modal/carga-modal.page';
import { ToastController } from '@ionic/angular';
import { DatePipe} from '@angular/common';

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

  constructor(private datePipe:DatePipe, private modalController:ModalController, private route: ActivatedRoute, private db: DatabaseService, private router: Router, private toast: ToastController) { 
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

async openModal() {
  const modal = await this.modalController.create({
    component: CargaModalPage,
    componentProps: {
      "paramTitle": "Cargar Kilos"
    }
  });

  modal.onDidDismiss().then((dataReturned) => {
    if (dataReturned.data !== undefined) {
      this.kilos.push( dataReturned.data);
      this.registro.total = this.kilos.reduce((a, b) => a + b, 0);
      this.updateRegistro();
    }
  });

  return await modal.present();
}
updateRegistro() {
  let kilos = this.kilos;
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


}
