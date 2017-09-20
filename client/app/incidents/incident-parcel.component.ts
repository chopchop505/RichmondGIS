import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { ParcelService } from '../services/parcel.service';
import { ToastComponent } from '../shared/toast/toast.component';

import * as moment from 'moment';

@Component({
  selector: 'app-incident-parcel',
  templateUrl: './incident-parcel.component.html',
  styleUrls: ['./incident-parcel.component.scss']
})
export class IncidentParcelComponent implements OnInit, OnChanges {
  @Input() incident = {};

  isLoading = true;
  error = '';
  parcels = [];

  constructor(private parcelService: ParcelService,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getParcels(this.incident);
  }

  ngOnChanges() {
    this.getParcels(this.incident);
  }

  getParcels(incident) {
    if (incident) {
      this.isLoading = true;
      
      const params = {
        latitude: incident.address ? incident.address.latitude : null,
        longitude: incident.address ? incident.address.longitude : null,
        time: incident.description ? moment(incident.description.event_opened).unix() : null,
      };

      this.parcelService.getParcels(params).subscribe(
        data => this.parcels = data,
        error => {
          console.log(error);
          this.error = error.json().error;
          this.isLoading = false;
        },
        () => this.isLoading = false
      );
    }
  }
}
