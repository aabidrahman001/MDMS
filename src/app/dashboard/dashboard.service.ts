/*
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable()
export class DashboardService {

  getDashboardStats() {
    return of({
      totalMeters: 1800000,
      onlineMeters: 1720000,
      offlineMeters: 80000,
      activeAlerts: 148
    }).pipe(delay(600));
  }

  getRecentAlerts() {
    return of([
      { meterId: 'MTR-1001', type: 'Tamper', severity: 'High', location: 'Mirpur 10', time: '2 min ago' },
      { meterId: 'MTR-0832', type: 'Low Voltage', severity: 'Medium', location: 'Uttara', time: '5 min ago' },
      { meterId: 'MTR-4442', type: 'Overload', severity: 'High', location: 'Gulshan', time: '10 min ago' }
    ]).pipe(delay(800));
  }

}
*/
/*

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map } from 'rxjs';

@Injectable()
export class DashboardService {

  private HES_API = 'http://128.199.20.163:4101/api';
  private MDM_API = 'http://128.199.20.163:8090/api';
  private GATEWAY_API = 'http://128.199.20.163:4000/api';
  private TELELMETRY_API = 'http://128.199.20.163:4102/api';
  private COMMAND_API = 'http://128.199.20.163:4103/api';
  private DLMS_API = 'http://128.199.20.163:4110/api';


  constructor(private http: HttpClient) {}

  // Dashboard stats
  getDashboardStats() {
    return forkJoin({
      total: this.http.get<number>(`${this.HES_API}/meters/count`),
      status: this.http.get<any>(`${this.HES_API}/meters/status-count`),
      alerts: this.http.get<number>(`${this.MDM_API}/alerts/active-count`)
    }).pipe(
      map(res => ({
        totalMeters: res.total || 0,
        onlineMeters: res.status?.online || 0,
        offlineMeters: res.status?.offline || 0,
        activeAlerts: res.alerts || 0
      }))
    );
  }

  // Recent alerts list
  getRecentAlerts() {
    return this.http.get<any[]>(`${this.MDM_API}/alerts/recent`);
  }
}
*/

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
      summary: this.http.get<any>(`${environment.GATEWAY}/summary`, { headers }),
      dcuStats: this.http.get<any>(`${environment.HES}/dcus/stats`, { headers }),
      commandSummary: this.http.get<any>(`${environment.COMMAND}/summary`, { headers })
    });
  }

  getRecentAlerts() {
    return this.http.get<any[]>(`${environment.GATEWAY}/alerts`, { headers: this.getHeaders() });
  }
}

