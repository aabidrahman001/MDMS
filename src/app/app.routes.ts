import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardUiComponent } from './dashboard/dashboard-ui/dashboard-ui.component';
import { MeterStatusComponent } from './dashboard/meter-status/meter-status.component';
import { GisHeatmapComponent } from './dashboard/gis-heatmap/gis-heatmap.component';
import { AlertsComponent } from './dashboard/alerts/alerts.component';
import { SettingsComponent } from './dashboard/settings/settings.component';

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
        title: 'Dashboard Overview',
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
      },
      {
        path: 'meter-status',
        title: 'Meter Status',
        component: MeterStatusComponent,
      },
      {
        path: 'gis-heatmap',
        title: 'GIS Heatmap',
        component: GisHeatmapComponent,
      },
      {
        path: 'alerts',
        title: 'Alerts',
        component: AlertsComponent,
      },
      {
        path: 'settings',
        title: 'Settings',
        component: SettingsComponent,
      },
    ]
  },

  // Fallback for unknown routes
  { path: '**', redirectTo: 'login' }
];
