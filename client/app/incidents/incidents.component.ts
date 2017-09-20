import { Component, OnInit } from '@angular/core';

import { IncidentService } from '../services/incident.service';
import { ToastComponent } from '../shared/toast/toast.component';

@Component({
  selector: 'app-incidents',
  templateUrl: './incidents.component.html',
  styleUrls: ['./incidents.component.scss']
})
export class IncidentsComponent implements OnInit {

  incidents = [];
  isLoading = true;

  selected = [];

  rows = [];
  columns = [{
    name: 'Incident Number',
    prop: 'description.incident_number',
    width: 45
  }, {
    name: 'Common Place Name',
    prop: 'address.common_place_name',
    width: 200

  }, {
    name: 'Event Opened',
    prop: 'description.event_opened'
  }, {
    name: 'Event Closed',
    prop: 'description.event_closed'
  }];

  constructor(private incidentService: IncidentService,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getIncidents();
  }

  getIncidents() {
    this.incidentService.getIncidents().subscribe(
      data => {
        this.rows = data;
        if (data && data.length > 0) {
          this.selected = [data[0]];
        }
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  onSelect({ selected }) {
    console.log('Selected row', selected, this.selected);
  }

}
