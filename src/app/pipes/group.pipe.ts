import { Pipe, PipeTransform } from '@angular/core';
import { Reg,Regbyfecha } from '../services/database.service'

@Pipe({
  name: 'group'
})
export class GroupPipe implements PipeTransform {
  transform(registros: Reg[], texto:string): Regbyfecha [] {
    return null;
  }

}
