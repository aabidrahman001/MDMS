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

    // Try to JSON-parse the stored value
    try {
      parsed = JSON.parse(stored);
    } catch {
      parsed = stored; // If not JSON, treat as plain string
    }

    console.log("PARSED:", parsed);

    // Case 1: If parsed is an object with username property
    if (parsed && typeof parsed === 'object' && parsed.username) {
      this.username = parsed.username;
    }

    // Case 2: If nested object like { admin: { username: "admin" } }
    else if (parsed && parsed.admin && parsed.admin.username) {
      this.username = parsed.admin.username;
    }

    // Case 3: If parsed is a plain string
    else if (typeof parsed === 'string') {
      this.username = parsed;
    }

    // Fallback
    else {
      this.username = 'admin';
    }
  }

  logout() {
    sessionStorage.removeItem('admin');
    this.router.navigate(['/login']);
  }
}
