import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-carga-modal',
  templateUrl: './carga-modal.page.html',
  styleUrls: ['./carga-modal.page.scss'],
})
export class CargaModalPage implements OnInit {
  modalTitle:string;
  modelId:number;
  kilos:number;
  constructor(
    private modalController: ModalController,
    private navParams: NavParams) { }

  ngOnInit() {
    this.modelId = this.navParams.data.paramID;
    this.modalTitle = this.navParams.data.paramTitle;
  }
  async closeModal() {
    const onClosedData: number = this.kilos;
    await this.modalController.dismiss(onClosedData);
  }
}
