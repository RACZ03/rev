import { Routes } from '@angular/router';
import { AppLayoutComponent } from '@theme/layout/app-layout/app-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'landing',
        loadChildren: () =>
          import('../modules/landing/landing.module').then(
            m => m.LandingModule
          ),
      },
      {
        path: '',
        redirectTo: 'landing',
        pathMatch: 'full',
      },
    ],
  },
];
