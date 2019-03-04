import {Component, Input, OnInit} from '@angular/core';

import {Bill} from '../../shared/models/bill.model';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: any;

  hrn: number;
  euro: number;

  constructor() { }

  ngOnInit() {
    const {quotes} = this.currency;
    this.hrn = quotes['USDUAH'] * this.bill.value;
    this.euro = quotes['USDEUR'] * this.bill.value;
  }

}
