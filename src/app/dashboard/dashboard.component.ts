import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  username: string = 'admin';

  constructor(private router: Router) {
    if (!sessionStorage.getItem('admin')) {
      this.router.navigate(['/login']);
    } else {
      this.username = sessionStorage.getItem('admin') || 'admin';
    }
  }

  logout() {
    sessionStorage.removeItem('admin');
    this.router.navigate(['/login']);
  }
}
