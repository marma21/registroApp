import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule, Pipe } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import {NgPipesModule} from 'ngx-pipes';
import { GroupByPipe } from 'ngx-pipes';


@NgModule({
  imports: [
    NgPipesModule,
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab1Page }])
  ],
  providers: [
    GroupByPipe,
  ],
  declarations: [Tab1Page]
})
export class Tab1PageModule {}
