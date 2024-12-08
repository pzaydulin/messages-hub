import { Routes } from '@angular/router';
import { MasterComponent } from './shared/layout/master/master.component';
import { DefaultComponent } from './shared/layout/default/default.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: DefaultComponent,
    providers: [],
    loadChildren: () =>
      import('./pages/auth/auth.routes').then((r) => r.routes),
  },
  {
    path: 'hub',
    component: MasterComponent,
    providers: [],
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: 'auth' },
];
