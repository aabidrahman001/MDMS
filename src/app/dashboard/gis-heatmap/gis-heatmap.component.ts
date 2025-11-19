import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-gis-heatmap',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="map-container" id="map"></div>
  `,
  styleUrls: ['./gis-heatmap.component.scss'],
  providers: [DashboardService]
})
export class GisHeatmapComponent implements OnInit {

  constructor(private ds: DashboardService) {}

  ngOnInit(): void {
    // Initialize Leaflet map
    const map = L.map('map').setView([23.8103, 90.4125], 6); // Centered on Bangladesh

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Load devices from summary API and plot markers
    this.ds.getDashboardStats().subscribe({
      next: stats => {
        const devices = stats.summary?.fleet?.devices || [];
        devices.forEach((d : any) => {
          // You would normally have lat/lon here, using dummy locations for now
          const lat = Math.random() * (26 - 20) + 20; // 20° to 26° N
          const lon = Math.random() * (92 - 88) + 88; // 88° to 92° E
          L.marker([lat, lon])
            .addTo(map)
            .bindPopup(`<b>${d.name}</b><br>${d.site}<br>Status: ${d.status}`);
        });
      }
    });
  }
}
