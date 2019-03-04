import {Component, Input, OnInit} from '@angular/core';
import {Category} from '../../shared/models/category.model';
import {EventModel} from '../../shared/models/event.model';

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  searchValue = '';
  searchPlaceholder = 'Amount';
  searchField = 'amount';

  @Input() categories: Category[] = [];
  @Input() events: EventModel[] = [];

  constructor() { }

  ngOnInit() {
    this.events.forEach((e) => {
      e.catName = this.categories.find(c => c.id === e.category).name;
    })
  }

  getEventClass(e: EventModel) {
    return {
      'label': true,
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income'
    }
  }

  changeCriteria(field: string) {
    const namesMap = {
      amount: 'Amount',
      date: 'Date',
      category: 'Category',
      type: 'Type'
    };
    this.searchPlaceholder = namesMap[field];
    this.searchField = field;
  }

}
