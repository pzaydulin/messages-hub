import { Routes } from '@angular/router';
import { MasterComponent } from './shared/layout/master/master.component';
import { DefaultComponent } from './shared/layout/default/default.component';
import { authGuard } from './core/guards/auth.guard';
import { guestGuard } from './core/guards/guest.guard';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [guestGuard],
    component: DefaultComponent,
    providers: [],
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((r) => r.routes),
  },
  {
    path: 'hub',
    canActivate: [authGuard],
    component: MasterComponent,
    loadChildren: () => import('./pages/hub/hub.routes').then((r) => r.routes),
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'hub' },
];
