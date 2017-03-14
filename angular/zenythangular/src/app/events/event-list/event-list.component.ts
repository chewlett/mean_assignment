import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Event } from '../event';
import { Displayevent } from '../displayevent';
import { MomentModule } from 'angular2-moment/moment.module';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css'],

  providers: [EventService]
})
export class EventListComponent implements OnInit {
  events: Event[];
  events_to_display: Displayevent[];
  // listOfEvents: Object;

  constructor(private _eventService: EventService, private _moment: MomentModule) { }

  ngOnInit() {
    this.events_to_display = new Array();

    this._eventService.getAllEvents().subscribe(
      // Success
      data => {
        this.events = data;

        // this.events = data.map(event);
        console.log('Events:');
        console.log(this.events);
        // console.log(new Date().toLocaleString('en-us', { weekday: 'long', month: 'long' }));

        // console.log(new Date().toLocaleString());
        // console.log(this.events[0].activity_start.toLocaleString('en-us', { weekday: 'long'}));
        console.log(new Date(data[0].activity_start).getDate());
        // console.log(new Date(data[0].))


        this.setDisplayEvents(data)

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

  setDisplayEvents(thisWeeksEvents) {

    var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    var timeOptions = { minute: 'numeric', hour: 'numeric' };

    let firstDay = new Displayevent();

    firstDay.activity_date = new Date(thisWeeksEvents[0].activity_start);
    firstDay.activity = "dateTableRow";
    firstDay.activity_long_date = firstDay.activity_date.toLocaleDateString('en-US', dateOptions);
    firstDay.activity_start = firstDay.activity_date.toLocaleTimeString('en-US', timeOptions);

    this.events_to_display.push(firstDay);
    console.log(firstDay.activity_long_date);
    console.log(firstDay.activity_start);

    for (var index = 0; index < thisWeeksEvents.length; index++) {

      let thisActivity = new Displayevent();
      thisActivity.activity = thisWeeksEvents[index].activity;
      thisActivity.activity_date = new Date(thisWeeksEvents[index].activity_start);
      thisActivity.activity_start = new Date(thisWeeksEvents[index].activity_start).toLocaleTimeString('en-US', timeOptions);
      thisActivity.activity_end = new Date(thisWeeksEvents[index].activity_end).toLocaleTimeString('en-US', timeOptions);
      thisActivity.activity_long_date = new Date(thisWeeksEvents[index].activity_start).toLocaleDateString('en-US', dateOptions);
      thisActivity.is_activity = true;
      // this.events_to_display.push(thisActivity);
      if (thisActivity.activity_long_date != this.events_to_display[this.events_to_display.length - 1].activity_long_date) {
        let dateTableRow = new Displayevent();
        // dateTableRow.activity = "dateTableRow";
        dateTableRow.is_activity = false;
        dateTableRow.activity_long_date = thisActivity.activity_long_date;
        this.events_to_display.push(dateTableRow);
      }

      /**
       * Check event is active 
       * if active, push current event to events_to_display
       */
      if (thisWeeksEvents[index].is_active) {
        this.events_to_display.push(thisActivity);
      }

    }

    console.log(this.events_to_display);
    // dayOfWeek = daysOfTheWeek[ firstDay.activity_date.getDay()];
    // dayOfMonth = firstDay.activity_date.getDate().toString();
    // month = firstDay.activity_date.getMonth().toString();





    // firstDay.activity_long_date = 


    // firstDay.activity_day_of_week = daysOfTheWeek[parseInt(new Date(thisWeeksEvents[0].activity_start.getDay()).toString())];
    // // firstDay.activity_long_date = 

    // for (var index = 0; index < thisWeeksEvents.length; index++) {
    //   let currentDay = parseInt(new Date(thisWeeksEvents[0].activity_start.getDay()).toString());

    //   let thisEvent = new Displayevent();


    //   thisEvent.activity_day_of_week
    // }

  }

}
