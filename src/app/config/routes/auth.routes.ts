import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login',
        loadChildren: () =>
          import('../../auth/login/login.module').then(m => m.LoginModule),
      },
      {
        path: 'create-account',
        loadChildren: () =>
          import('../../auth/create-password/create-password.module').then(
            m => m.CreatePasswordModule
          ),
      },
    ],
  },
];
