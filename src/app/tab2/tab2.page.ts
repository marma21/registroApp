import { Component, OnInit } from '@angular/core';
import { DatabaseService, Reg } from '../services/database.service';
import { ActivatedRoute, Router } from '@angular/router'
import { ModalController } from '@ionic/angular';
import {CargaModalPage} from '../carga-modal/carga-modal.page';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  selectedView = 'camion';
  dataReturned:any;
  registro: Reg=null;
  kilos:any[];
  constructor(private modalController:ModalController, private route: ActivatedRoute, private db: DatabaseService, private router: Router, private toast: ToastController) { 
  this.route.paramMap.subscribe(params => {
    let regId = params.get('id');

    this.db.getRegistro(regId).then(data => {
      this.registro = data;
      this.kilos = this.registro.kilos;
      console.log(this.registro);
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
    if (dataReturned !== null) {
      this.kilos.push( dataReturned.data);
      this.updateRegistro();      
      //alert('Modal Sent Data :'+ dataReturned);
    }
  });

  return await modal.present();
}
updateRegistro() {
  let kilos = this.kilos;
  // skills = skills.map(skill => skill.trim());
  this.registro.kilos = kilos;

  this.db.updateRegistro(this.registro).then(async (res) => {
    let toast = await this.toast.create({
      message: 'Kilos agregados',
      duration: 3000
    });
    toast.present();
  });
}

deleteKilo(index){

  if(index > -1){
    this.kilos.splice(index, 1);
    this.registro.kilos = this.kilos;
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
