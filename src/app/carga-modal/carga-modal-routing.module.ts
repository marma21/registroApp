import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CargaModalPage } from './carga-modal.page';

const routes: Routes = [
  {
    path: '',
    component: CargaModalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CargaModalPageRoutingModule {}
