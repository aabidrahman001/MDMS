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
