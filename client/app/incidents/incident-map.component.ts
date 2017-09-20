import { Component, OnChanges, OnInit, Input } from '@angular/core';

import { ToastComponent } from '../shared/toast/toast.component';

declare var L: any;

const RICHMOND = {
  latitude: 37.5407,
  longitude: -77.4360,
};

@Component({
  selector: 'app-incident-map',
  templateUrl: './incident-map.component.html',
  styleUrls: ['./incident-map.component.scss']
})
export class IncidentMapComponent implements OnInit, OnChanges {
  @Input() incident = {};

  isLoading = true;

  icon = L.icon({
    iconUrl: 'assets/marker-icon.png',
    shadowUrl: 'assets/marker-shadow.png'
  });

  leafletLayers = [];

  leafletOptions = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
      })
    ],
    zoom: 9,
    center: L.latLng([ RICHMOND.latitude, RICHMOND.longitude ])
  };

  map;

  constructor(public toast: ToastComponent) { }

  ngOnInit() {
    this.buildLayers(this.incident);
  }

  ngOnChanges() {
    this.buildLayers(this.incident);
    this.setBounds();
  }

  buildLayers(incident) {
    this.isLoading = true;

    this.leafletLayers = [];

    if (incident && incident.address && incident.address.latitude && incident.address.longitude) {
      const latLng = new L.LatLng(incident.address.latitude, incident.address.longitude);

      // build hover text
      let content = '';
      if (incident.description && incident.description.incident_number) {
        content += '<strong>Incident Number:</strong>' + ' <span>' + incident.description.incident_number + '</span><br>';
      }
      if (incident.address && incident.address.common_place_name) {
        content += '<strong>Common Place Name:</strong>' + ' <span>' + incident.address.common_place_name + '</span><br>';
      }
      if (incident.fire_department && incident.fire_department.name) {
        content += '<strong>Fire Department:</strong>' + ' <span>' + incident.fire_department.name + '</span><br>';
      }

      const tooltip = L.tooltip()
        .setLatLng(latLng)
        .setContent(content);

      this.leafletLayers.push(
        L.marker(latLng, { icon: this.icon }).bindTooltip(tooltip, { direction: 'top' })
      );
    }
    this.isLoading = false;
  }

  onMapReady(map: L.Map) {
    this.map = map;
    this.setBounds();
  }

  setBounds() {
    // zoom to fit
    if (this.map && this.leafletLayers) {
      const group = new L.featureGroup(this.leafletLayers);
      this.map.fitBounds(group.getBounds());
    }
  }
}
