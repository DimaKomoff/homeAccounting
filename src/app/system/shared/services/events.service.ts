import {BaseApi} from '../../../shared/core/base-api';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EventModel} from '../models/event.model';
import {Injectable} from '@angular/core';

@Injectable()
export class EventsService extends BaseApi {
  constructor(
    public http: HttpClient
  ) {
    super(http);
  }

  addEvent(event: EventModel): Observable<EventModel> {
    return this.post('events', event);
  }

  getEvents(): Observable<EventModel[]> {
    return this.get('events');
  }

  getEventById(id: string): Observable<EventModel> {
    return this.get(`events/${id}`);
  }
}
