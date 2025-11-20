import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'x-tenant-id': environment.TENANT_ID,
      'Authorization': `Bearer ${environment.TOKEN}`
    };
  }

  getDashboardStats() {
    const headers = this.getHeaders();

    return forkJoin({
      fleetSummary: this.http.get<any>(`${environment.GATEWAY}/summary`, { headers }),
      telemetry: this.http.get<any>(`${environment.TELEMETRY}/summary`, { headers }),
      dcuStats: this.http.get<any>(`${environment.HES}/dcus/stats`, { headers }),
      commandSummary: this.http.get<any>(`${environment.COMMAND}/summary`, { headers })
    });
  }

  getRecentAlerts() {
    return this.http.get<any[]>(`${environment.GATEWAY}/alerts`, { headers: this.getHeaders() });
  }
}
