import { Routes } from '@angular/router';
import { MasterComponent } from './shared/layout/master/master.component';
import { DefaultComponent } from './shared/layout/default/default.component';

export const routes: Routes = [
  //   { path: '', redirectTo: 'messages', pathMatch: 'full' },
  {
    path: '',
    component: DefaultComponent,
    providers: [],
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
      },
    ],
  },
  {
    path: '',
    component: MasterComponent,
    providers: [],
    children: [
      {
        path: 'messages',
        loadComponent: () =>
          import('./pages/messages/messages.component').then(
            (m) => m.MessagesComponent
          ),
      },
      {
        path: 'compose',
        loadComponent: () =>
          import('./pages/compose/compose.component').then(
            (m) => m.ComposeComponent
          ),
      },
    ],
  },
  //   { path: '**', redirectTo: 'messages' },
];
