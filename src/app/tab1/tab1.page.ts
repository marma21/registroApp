import { Component } from '@angular/core';

import { DatabaseService, Reg } from '../services/database.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  dataReturned:any;
  registros: Reg[] = [];

  constructor(private db: DatabaseService) {}

  ngOnInit() {
    this.db.getDatabaseState().subscribe(rdy => {
      if (rdy) {
        this.db.getRegs().subscribe(regs => {
          this.registros = regs;
        })
      }
    });
  }
}