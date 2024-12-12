import { Component, computed, DoCheck, inject } from '@angular/core';
import { LoginFormComponent } from "./ui/login-form/login-form.component";
import { CardComponent } from "../../../shared/components/card/card.component";
import { LoginService } from './data-access/login.service';
import { Router, RouterLink } from '@angular/router';
import { StorageService } from '../../../core/data-access/storage.service';
import { ILogin } from '../../../core/models/auth.interfaces';


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
            [loginStatus]="status()"
            [error]="errorMessage()"
            (login)="onSignIn($event)"
          />
          <p class="text-sm !mt-6 text-center">
            Don't have an account
            <a routerLink="/auth/register" class="font-semibold"
              >Register here</a
            >
            <button (click)="storageService.removeItem()">Clear</button>
          </p>
        </div>
      </app-card>
    </div>
  `,
})
export class LoginComponent implements DoCheck {
  protected loginService = inject(LoginService);
  protected storageService = inject(StorageService);
  private router = inject(Router);

  status = this.loginService.status;
  currentUser = this.loginService.currentUser;
  errorMessage = this.loginService.errorMessage;

  onSignIn(credential: ILogin) {
    this.loginService.signIn(credential);
  }

  checkAuth = computed(() => {
    if (this.storageService.isAuth()) {
      this.router.navigate(['hub', 'messages']);
    }
  });

  ngDoCheck(): void {
    this.checkAuth();
  }
}
