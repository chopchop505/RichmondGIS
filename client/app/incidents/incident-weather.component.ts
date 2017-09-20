import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { WeatherService } from '../services/weather.service';
import { ToastComponent } from '../shared/toast/toast.component';

import * as moment from 'moment';

@Component({
  selector: 'app-incident-weather',
  templateUrl: './incident-weather.component.html',
  styleUrls: ['./incident-weather.component.scss']
})
export class IncidentWeatherComponent implements OnInit, OnChanges {
  @Input() incident = {};

  isLoading = true;
  error = '';
  weather = {};

  constructor(private weatherService: WeatherService,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getWeather(this.incident);
  }

  ngOnChanges() {
    this.getWeather(this.incident);
  }

  getWeather(incident) {
    if (incident) {
      this.isLoading = true;

      const params = {
        latitude: incident.address ? incident.address.latitude : null,
        longitude: incident.address ? incident.address.longitude : null,
        time: incident.description ? moment(incident.description.event_opened).unix() : null,
      };

      this.weatherService.getWeather(params).subscribe(
        data => this.weather = data,
        error => {
          console.log(error);
          this.error = error.json().error;
          this.isLoading = false;
        },
        () => this.isLoading = false
      );
    }
  }

  getTime(weather) {
    if (weather && weather.currently && weather.currently.time) {
      return moment.unix(weather.currently.time).format('LLL');
    }
  }

}
