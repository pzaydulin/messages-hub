import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: 'messages',
    loadComponent: () =>
      import('./messages/messages.component').then((m) => m.MessagesComponent),
  },
  {
    path: 'compose',
    loadComponent: () =>
      import('./compose/compose.component').then((m) => m.ComposeComponent),
  },
  {
    path: '',
    redirectTo: 'messages',
    pathMatch: 'full',
  },
];