import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "messages",
    loadChildren: () =>
      import('./messages/messages.component').then((m) => m.MessagesComponent),
  },
  {
    path: "compose",
    loadChildren: () =>
      import('./compose/compose.component').then((m) => m.ComposeComponent),
  },
  {
    path: "",
    redirectTo: "messages",
    pathMatch: "full"
  },
];