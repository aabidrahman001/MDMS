import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import 'leaflet.markercluster/dist/leaflet.markercluster.js';

@Component({
  selector: 'app-gis-heatmap',
  standalone: true,
  templateUrl: './gis-heatmap.component.html',
  styleUrls: ['./gis-heatmap.component.scss']
})
export class GisHeatmapComponent implements OnInit, AfterViewInit {
  map!: L.Map;

  siteCoordinates: Record<string, [number, number]> = {
    "Hatirjheel": [23.7407, 90.3843],
    "Mymensingh": [24.7471, 90.4203],
    "Patenga": [22.3456, 91.8023],
    "Banani": [23.7945, 90.4100],
    "Rajpara": [24.3747, 88.6048],
    "Khulna Dock": [22.8051, 89.5683],
    "Jatrabari": [23.7165, 90.4221],
    "Cumilla EPZ": [23.4600, 91.1800],
    "Sreemangal": [24.3061, 91.7292]
  };

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.initMap();
    this.loadDevices();
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [23.8103, 90.4125], // Dhaka
      zoom: 7,
      minZoom: 7,
      maxBounds: [[20, 85], [27, 93]] // restrict map to Bangladesh
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);
  }

  private loadDevices(): void {
    this.dashboardService.getDashboardStats().subscribe(stats => {
      const devices = stats.fleetSummary?.fleet?.devices || [];

      // @ts-ignore: Leaflet.MarkerCluster plugin
      const markers = L.markerClusterGroup();

      devices.forEach((d: any) => {
        const coords = this.siteCoordinates[d.site];
        if (!coords) return;

        const color = d.status === 'online' ? 'green' :
          d.status === 'offline' ? 'red' : 'orange';

        const marker = L.circleMarker(coords, {
          radius: 8,
          color,
          fillOpacity: 0.7
        }).bindPopup(
          `<b>${d.name}</b><br>Status: ${d.status}<br>Feeder: ${d.feeder}`
        );

        markers.addLayer(marker);
      });

      this.map.addLayer(markers);

      // Fit map bounds to all markers
      const latLngs = devices.map((d: any) => this.siteCoordinates[d.site]).filter(Boolean);
      if (latLngs.length) this.map.fitBounds(L.latLngBounds(latLngs));
    });
  }
}
