import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { DatabaseService, Reg ,GroupedByfecha,Regbyfecha} from '../services/database.service';
import { GroupByPipe } from 'ngx-pipes';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  groupedByfecha:GroupedByfecha;
  dataReturned:Array<Reg>;
  registros: Reg[] = [];
  regbyfecha: Regbyfecha[]=[];

  constructor(private db: DatabaseService, private router:Router, private groupby:GroupByPipe) {}

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getRegs().subscribe(regs => {
          this.groupedByfecha = this.groupby.transform(regs, ['fecha','lote'], ' Lote:' );
          this.regbyfecha = [];
          for (const property in this.groupby.transform(regs, ['fecha','lote'], ' Lote:' )) {
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
      this.router.navigateByUrl('/tabs/tab2/'+data);
    });
  }

}