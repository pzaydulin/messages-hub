import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { httpInterceptor } from './core/interceptors/http.interceptor';
import { provideStore } from '@ngxs/store';
import { UserState } from './core/store-ngxs/user.store';
import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { MessageState } from './core/store-ngxs/message.store';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideAnimations(),
    provideHttpClient(withInterceptors([httpInterceptor])),
    provideStore([UserState, MessageState], withNgxsReduxDevtoolsPlugin()),
  ],
};
