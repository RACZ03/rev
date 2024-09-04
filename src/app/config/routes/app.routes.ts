import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'modules',
    loadChildren: () =>
      import('../../modules/modules.module').then(m => m.ModulesModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../../auth/auth.module').then(m => m.AuthModule),
  },

  { path: '', redirectTo: 'modules', pathMatch: 'full' },
  { path: '**', redirectTo: 'modules' },
];
