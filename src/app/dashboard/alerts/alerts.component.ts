import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { CommonModule } from '@angular/common';
import { NgIf, NgFor } from '@angular/common';
import { interval } from 'rxjs';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

  totalMeters = 0;
  onlineMeters = 0;
  underMaintenance = 0;
  offlineMeters = 0;
  activeAlerts = 0;
  recentAlerts: any[] = [];
  loading = true;

  constructor(private ds: DashboardService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;

    this.ds.getDashboardStats().subscribe({
      next: stats => {
        const fleet = stats.fleetSummary?.fleet || {};
        this.totalMeters = fleet.total || 0;
        this.onlineMeters = fleet.status?.online || 0;
        this.underMaintenance = fleet.status?.maintenance || 0;
        this.offlineMeters = fleet.status?.offline || 0;
        this.refreshAlerts();
        this.loading = false;
      },
      error: err => {
        console.error('Error loading stats', err);
        this.loading = false;
      }
    });

    interval(30000).subscribe(() => this.refreshAlerts());
  }

  refreshAlerts() {
    this.ds.getRecentAlerts().subscribe({
      next: alerts => {
        this.recentAlerts = alerts || [];
        this.activeAlerts = this.recentAlerts.length;
      },
      error: err => console.error('Error loading alerts', err)
    });
  }
}
