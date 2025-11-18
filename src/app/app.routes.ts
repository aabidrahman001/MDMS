import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardUiComponent } from './dashboard/dashboard-ui/dashboard-ui.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },

  {
    path: 'login',
    title: 'Login Page',
    component: LoginComponent,
  },

  {
    path: 'dashboard',
    title: 'Dashboard',
    component: DashboardComponent,

    children: [
      {
        path: '',
        title: 'Dashboard',
        component: DashboardUiComponent,
      },
      {
        path: 'overview',
        title: 'Dashboard Overview',
        component: DashboardUiComponent,
      },
      {
        path: 'mdms',
        title: 'MDMS Admin',
        component: DashboardUiComponent,
      }
    ]
  },

  // Fallback for unknown routes
  { path: '**', redirectTo: 'login' }
];
