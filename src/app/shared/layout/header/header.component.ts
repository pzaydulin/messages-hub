import { Component, DestroyRef, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar'; 
import { Router } from '@angular/router';
import { LoginService } from '../../../pages/auth/login/data-access/login.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToolbarModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private loginService = inject(LoginService);

  onLogout() {
    this.loginService.logOut();
  }
}
