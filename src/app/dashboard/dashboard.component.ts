/*
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  // Used by header
  username: string = 'User';

  // Stats expected by your HTML
  totalMeters: number = 0;
  onlineMeters: number = 0;
  offlineMeters: number = 0;
  activeAlerts: number = 0;

  // Loading state
  loading: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {
    this.loading = true;

    // Simulated API delay
    setTimeout(() => {
      this.username = 'Admin';  // or fetch from login

      // Mock stats — align with your HTML usage
      this.totalMeters = 1800000;
      this.onlineMeters = 1725000;
      this.offlineMeters = 75000;
      this.activeAlerts = 148;

      this.loading = false;
    }, 800);
  }

  logout() {
    // Later you can replace with router navigation
    console.log('Logging out...');
    window.location.href = '/login';
  }
}
*/
import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { CommonModule } from '@angular/common';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService]
})
export class DashboardComponent implements OnInit {

  username = 'Admin';

  totalMeters = 0;
  onlineMeters = 0;
  offlineMeters = 0;
  activeAlerts = 0;

  recentAlerts: any[] = [];

  loading = true;

  constructor(
    private router: Router,
    //private dataService: DataServiceService,
    private ds: DashboardService
  )
  {}

  storedValue!: any;
  ngOnInit(): void {
    this.loadData();
      // Check if the user is logged in as admin
      if(!sessionStorage.getItem('admin')) {
      this.router.navigate(['/login']);
      return;
    }
    this.storedValue = sessionStorage.getItem('admin');
  }

  loadData() {
    this.loading = true;

    this.ds.getDashboardStats().subscribe(stats => {
      this.totalMeters = stats.totalMeters;
      this.onlineMeters = stats.onlineMeters;
      this.offlineMeters = stats.offlineMeters;
      this.activeAlerts = stats.activeAlerts;
    });

    this.ds.getRecentAlerts().subscribe(alerts => {
      this.recentAlerts = alerts;
      this.loading = false;
    });
  }



  logout() {
    sessionStorage.removeItem('admin');
    this.router.navigate(['/login']);

  }

}
