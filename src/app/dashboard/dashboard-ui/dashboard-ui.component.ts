import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { interval } from 'rxjs';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard-ui',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './dashboard-ui.component.html',
  styleUrls: ['./dashboard-ui.component.scss']
})
export class DashboardUiComponent implements OnInit, AfterViewInit {

  totalMeters = 0;
  onlineMeters = 0;
  underMaintenance = 0;
  offlineMeters = 0;
  activeAlerts = 0;

  loadByHour: any[] = [];
  carbonAvoided = 0;
  powerQuality = 0;

  pendingCmd = 0;
  executedToday = 0;
  failedToday = 0;

  recentAlerts: any[] = [];

  fleetRegions: any[] = [];

  loading = true;

  statusChart: any;
  regionChart: any;
  loadChart: any;

  constructor(private ds: DashboardService) {}

  ngOnInit(): void {
    this.loadData();
    interval(30000).subscribe(() => this.refreshAlerts());
  }

  ngAfterViewInit(): void {
  }


  loadData() {
    this.loading = true;

    this.ds.getDashboardStats().subscribe({
      next: stats => {
        const fleet = stats.fleetSummary?.fleet || {};
        this.totalMeters = fleet.total || 0;
        this.onlineMeters = fleet.status?.online || 0;
        this.offlineMeters = fleet.status?.offline || 0;
        this.underMaintenance = fleet.status?.maintenance || 0;

        this.fleetRegions = fleet.regions || [];
        console.log('Fleet regions for chart:', this.fleetRegions);

        const telemetry = stats.telemetry || {};
        this.loadByHour = telemetry.loadByHour || [];
        this.carbonAvoided = telemetry.carbonAvoidedKg || 0;
        this.powerQuality = telemetry.powerQualityScore || 0;


        const commands = stats.commandSummary || {};
        this.pendingCmd = commands.pending || 0;
        this.executedToday = commands.executedToday || 0;
        this.failedToday = commands.failedToday || 0;

        this.refreshAlerts();

        setTimeout(() => this.renderCharts(), 0);

        this.loading = false;
      },
      error: err => {
        console.error('Error loading dashboard stats', err);
        this.loading = false;
      }
    });
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

  renderCharts() {

    const statusCtx = document.getElementById('statusChart') as HTMLCanvasElement;
    if (statusCtx) {
      this.statusChart = new Chart(statusCtx, {
        type: 'doughnut',
        data: {
          labels: ['Online', 'Offline', 'Maintenance'],
          datasets: [{
            data: [this.onlineMeters, this.offlineMeters, this.underMaintenance],
            backgroundColor: ['#28a745', '#d9534f', '#ffc107']
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'bottom' } }
        }
      });
    }


    const regionCtx = document.getElementById('regionChart') as HTMLCanvasElement;
    if (regionCtx) {
      this.regionChart = new Chart(regionCtx, {
        type: 'bar',
        data: {
          labels: this.fleetRegions.map(r => r.region),
          datasets: [{
            label: 'Meters',
            data: this.fleetRegions.map(r => r.devices),
            backgroundColor: '#3b82f6'
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } }
        }
      });
    }


    const loadCtx = document.getElementById('loadChart') as HTMLCanvasElement;
    if (loadCtx) {
      this.loadChart = new Chart(loadCtx, {
        type: 'line',
        data: {
          labels: this.loadByHour.map(h => h.hour),
          datasets: [{
            label: 'Usage (kWh)',
            data: this.loadByHour.map(h => h.usage),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59,130,246,0.2)',
            fill: true,
            tension: 0.3
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { position: 'top' } },
          scales: { y: { beginAtZero: true } }
        }
      });
    }
  }
}
