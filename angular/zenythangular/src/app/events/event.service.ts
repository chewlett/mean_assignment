import { Injectable } from '@angular/core';
import { Event } from './event';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class EventService {
  private eventsUrl = '/api/';

  constructor(private _http: Http) { }

/***********************************************
 * 
 * RESTFUL Service Functions
 * 
 ***********************************************/


  /*
  * Function: GET all events
  * get("/api/allevents")
  * Url will need updating
  */
  getAllEvents() {
    let url = this.eventsUrl + 'events';

    return this._http.get(url)
      .map(this.extractData)
      .catch(this.handleError);
  }


  /***********************************************
  * handleError
  * Extract Data back into Json
  ***********************************************/

    // Retreival of JSON from .NET is a success.
    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    return Observable.throw(errMsg);
  }

}
