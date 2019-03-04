import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from 'rxjs';

import {BillService} from '../shared/services/bill.service';
import {CategoriesService} from '../shared/services/categories.service';
import {EventsService} from '../shared/services/events.service';
import {Category} from '../shared/models/category.model';
import {EventModel} from '../shared/models/event.model';
import {Bill} from '../shared/models/bill.model';

@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  sub1: Subscription;

  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  events: EventModel[] = [];


  constructor(
    private billService: BillService,
    private categoriesService: CategoriesService,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Bill, Category[], EventModel[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];
      this.isLoaded = true;
    })
  }

  getCatCost(cat: Category): number {
    const catEvents = this.events.filter(event => event.category === cat.id && event.type === 'outcome');
    return catEvents.reduce((total, event) => {
      total += event.amount;
      return total;
    }, 0)
  }

  private getPercent(cat: Category): number {
    const percent = (100 * this.getCatCost(cat)) / cat.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: Category): string {
    return  this.getPercent(cat) + '%';
  }

  getCatColorClass(cat: Category): string {
    const percent = this.getPercent(cat);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
