import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CargaModalPageRoutingModule } from './carga-modal-routing.module';

import { CargaModalPage } from './carga-modal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CargaModalPageRoutingModule
  ],
  declarations: [CargaModalPage]
})
export class CargaModalPageModule {}
