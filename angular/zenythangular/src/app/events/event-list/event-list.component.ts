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
        console.log('Events:');

        /**
         * Call local function
         * Iterates through JSON and applies logic as necessary. 
         */
        this.setDisplayEvents(data);
      },
      error => {
        alert(error);
      },
      () => {
        console.log("SUBSCRIPTION FINISHED: get all events")
      }
    );
  }

  setDisplayEvents(thisWeeksEvents) {
    const DATEOPTIONS = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const TIMEOPTIONS = { minute: 'numeric', hour: 'numeric' };

    /**
     * insert first dateRow into evets_to_display Array
     */
    let firstDay = new Displayevent();
    firstDay.activity_date = new Date(thisWeeksEvents[0].activity_start);
    firstDay.activity = "dateTableRow";
    firstDay.activity_long_date = firstDay.activity_date.toLocaleDateString('en-US', DATEOPTIONS);
    firstDay.activity_start = firstDay.activity_date.toLocaleTimeString('en-US', TIMEOPTIONS);
    this.events_to_display.push(firstDay);

    /**
     * Iterate through api response -> generate formatted display events_to_display Array
     * Dynamically insert header rows into events_to_display Array
     */
    for (var index = 0; index < thisWeeksEvents.length; index++) {

      let thisActivity = new Displayevent();
      thisActivity.activity = thisWeeksEvents[index].activity;
      thisActivity.activity_date = new Date(thisWeeksEvents[index].activity_start);
      thisActivity.activity_start = new Date(thisWeeksEvents[index].activity_start).toLocaleTimeString('en-US', TIMEOPTIONS);
      thisActivity.activity_end = new Date(thisWeeksEvents[index].activity_end).toLocaleTimeString('en-US', TIMEOPTIONS);
      thisActivity.activity_long_date = new Date(thisWeeksEvents[index].activity_start).toLocaleDateString('en-US', DATEOPTIONS);
      thisActivity.is_activity = true;

      /**
       * Compare thisWeekEvents[index] to last event added to events_to_display Array
       * If thisWeekEvents[index] is on a new day, add dateTableRow to events_to_display Array
       */
      if (thisActivity.activity_long_date != this.events_to_display[this.events_to_display.length - 1].activity_long_date) {
        let dateTableRow = new Displayevent();

        dateTableRow.is_activity = false;
        dateTableRow.activity_long_date = thisActivity.activity_long_date;
        this.events_to_display.push(dateTableRow);
      }

      /**
       * After confirmed dateTableRow is correct
       * Insert thisWeeksEvents[index] to events_to_display Array
       */

      /**
       * Check event is active 
       * if active, push current event to events_to_display
       */
      if (thisWeeksEvents[index].is_active) {
        this.events_to_display.push(thisActivity);
      }
    }
    console.log(this.events_to_display);
  }

}
