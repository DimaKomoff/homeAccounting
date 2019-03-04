import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

import {EventsService} from '../../shared/services/events.service';
import {CategoriesService} from '../../shared/services/categories.service';
import {mergeMap} from 'rxjs/operators';
import {EventModel} from '../../shared/models/event.model';
import {Category} from '../../shared/models/category.model';
import {combineLatest, Subscription} from 'rxjs';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: EventModel;
  category: Category;

  isLoaded = false;
  sub1: Subscription;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.sub1 =  this.route.params
      .pipe(
        mergeMap((params: Params) => this.eventsService.getEventById(params['id'])),
        mergeMap((event: EventModel) => {
          this.event = event;
          return this.categoriesService.getCategoryById(event.category)
        })
      )
      .subscribe((category: Category) => {
        this.category = category;
        this.isLoaded = true;
      });
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }

}
