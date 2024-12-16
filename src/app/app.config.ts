import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { provideStore } from '@ngxs/store';
import { UserState } from './core/store-ngxs/user.store';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideStore([UserState], withNgxsReduxDevtoolsPlugin()),
  ],
};
