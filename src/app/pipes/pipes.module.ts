import { NgModule } from '@angular/core';
import { GroupPipe } from './group.pipe';

@NgModule({
  declarations: [GroupPipe],
  exports:[GroupPipe]
})
export class PipesModule { }
