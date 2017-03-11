import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../event';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[];
  listOfEvents: Object;

  constructor(private _eventService: EventService) { }

  ngOnInit() {
    this._eventService.getAllEvents().subscribe(
      // Success
      data => {
        console.log(data);
        this.listOfEvents = data;
      },
      error => {
        alert(error);
      },
      () => {
        console.log("SUBSCRIPTION FINISHED: get all events")
      }
    );
  }

}
