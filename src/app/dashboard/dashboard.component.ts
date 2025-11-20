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

    const stored = sessionStorage.getItem('admin');

    console.log("RAW STORED:", stored);

    if (!stored) {
      this.router.navigate(['/login']);
      return;
    }

    let parsed: any;

    try {
      parsed = JSON.parse(stored);
    } catch {
      parsed = stored;
    }

    console.log("PARSED:", parsed);


    if (parsed && typeof parsed === 'object' && parsed.username) {
      this.username = parsed.username;
    }


    else if (parsed && parsed.admin && parsed.admin.username) {
      this.username = parsed.admin.username;
    }


    else if (typeof parsed === 'string') {
      this.username = parsed;
    }


    else {
      this.username = 'admin';
    }
  }

  logout() {
    sessionStorage.removeItem('admin');
    this.router.navigate(['/login']);
  }
}
