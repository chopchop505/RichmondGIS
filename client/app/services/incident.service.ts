import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class IncidentService {

  private headers = new Headers({ 'Content-Type': 'appliincidention/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getIncidents(): Observable<any> {
    return this.http.get('/api/incidents').map(res => res.json());
  }

}
