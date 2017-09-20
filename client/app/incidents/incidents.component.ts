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

  constructor(private incidentService: IncidentService,
              public toast: ToastComponent) { }

  ngOnInit() {
    this.getIncidents();
  }

  getIncidents() {
    this.incidentService.getIncidents().subscribe(
      data => this.incidents = data,
      error => console.log(error),
      () => this.isLoading = false
    );
  }

}
