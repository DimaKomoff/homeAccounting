import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {Bill} from '../models/bill.model';
import {BaseApi} from '../../../shared/core/base-api';

@Injectable()
export class BillService extends BaseApi {
  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  getBill(): Observable<Bill> {
    return this.get('bill');
  }

  getCurrency(): Observable<any> {
    return this.http.get('http://apilayer.net/api/live?access_key=ee034a0c345d380d0bae832a1d6e67a3&currencies=EUR,RUB,UAH&format=1')
      .pipe(
        map((response: Response) => response)
      );
  }

  updateBill(bill: Bill): Observable<Bill> {
    return this.put('bill', bill);
  }
}
