import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../event';
import {MomentModule} from 'angular2-moment/moment.module';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],
  providers: [EventService]
})
export class EventListComponent implements OnInit {
  events: Event[];
  startOfWeek: Date;
  endOfWeek:   Date;
  // listOfEvents: Object;

  constructor(private _eventService: EventService, private _moment: MomentModule) { }

  ngOnInit() {
    this._eventService.getAllEvents().subscribe(
      // Success
      (data: Event[]) => {
        this.events = data;

        // this.events = data.map(event);
        console.log('Events:');
        console.log(this.events);
        console.log(new Date().toLocaleString('en-us', {  weekday: 'long', month: 'long' }));

        console.log(new Date().toLocaleString());


      },
      error => {
        alert(error);
      },
      () => {
        console.log("SUBSCRIPTION FINISHED: get all events")
      }
    );

    // this.startOfWeek = moment()


  }

  setCurrentWeek() {
    var today = new Date();
  }

}
