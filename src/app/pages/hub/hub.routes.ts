import { Routes } from "@angular/router";
import { MessagesComponent } from "./messages/messages.component";

export const routes: Routes = [
  {
    path: 'messages/:type',
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
    redirectTo: 'messages/inbox',
    pathMatch: 'full',
  },
];