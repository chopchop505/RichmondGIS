import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {

  private headers = new Headers({ 'Content-Type': 'appliincidention/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  getWeather(params): Observable<any> {
    return this.http.get('/api/weather', { params: params }).map(res => res.json());
  }

}
