import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-meter-status',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './meter-status.component.html',
  styleUrls: ['./meter-status.component.scss']
})
export class MeterStatusComponent implements OnInit {

  loading = true;

  fleetTotal = 0;
  online = 0;
  offline = 0;
  maintenance = 0;
  directConnections = 0;
  dcuConnections = 0;

  telemetryUsage: { hour: string; usage: number }[] = [];
  carbonAvoided = 0;
  powerQuality = 0;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadMeterStatus();
  }

  private loadMeterStatus() {
    this.dashboardService.getDashboardStats().subscribe({
      next: (res: any) => {
        const fleet = res.fleet || {};
        const status = fleet.status || {};
        const telemetry = res.telemetry || {};
        const connections = fleet.connections || {};

        this.fleetTotal = fleet.total || 0;
        this.online = status.online || 0;
        this.offline = status.offline || 0;
        this.maintenance = status.maintenance || 0;

        this.directConnections = connections.direct || 0;
        this.dcuConnections = connections.dcu || 0;

        this.telemetryUsage = telemetry.loadByHour || [];
        this.carbonAvoided = telemetry.carbonAvoidedKg || 0;
        this.powerQuality = telemetry.powerQualityScore || 0;

        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}
