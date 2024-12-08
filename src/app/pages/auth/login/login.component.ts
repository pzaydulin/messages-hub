import { Component, inject } from '@angular/core';
import { LoginFormComponent } from "./ui/login-form/login-form.component";
import { CardComponent } from "../../../shared/components/card/card.component";
import { LoginService } from './data-access/login.service';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent, CardComponent, RouterLink],
  template: `
    <div class="flex w-2/5 items-center justify-center m-auto h-screen">
      <app-card class="w-full">
        <div card-header>Sign In</div>
        <div card-body>
          <app-login-form
            [loginStatus]="loginService.status()"
            (login)="loginService.login$.next($event)"
          />
          <p class="text-sm !mt-6 text-center">
            Don't have an account
            <a
              routerLink="/auth/register"
              class="font-semibold"
              >Register here</a
            >
          </p>
        </div>
      </app-card>
    </div>
  `,
})
export class LoginComponent {
  public loginService = inject(LoginService);
}
