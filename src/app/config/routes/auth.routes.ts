import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    children: [
      // {
      //   path: 'sign-in',
      //   loadChildren: () =>
      //     import('../../auth/login/login.module').then(m => m.LoginModule),
      // },
      {
        path: 'sign-up',
        loadChildren: () =>
          import('../../auth/create-password/create-password.module').then(
            m => m.CreatePasswordModule
          ),
      },

      // {
      //   path: 'forgot-password',
      //   loadChildren: () =>
      //     import('../../auth/forgot-password/forgot-password.module').then(
      //       m => m.ForgotPasswordModule
      //     ),
      // },
    ],
  },
];
