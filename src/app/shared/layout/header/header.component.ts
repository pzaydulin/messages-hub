import { Component, DestroyRef, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar'; 
import { LoginService } from '../../../pages/auth/login/data-access/login.service';
import { InitialsPipe } from '../../pipes/initials.pipe';
import { Store } from '@ngxs/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { UserState } from '../../../core/store-ngxs/user.store';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToolbarModule, ButtonModule, InitialsPipe, BadgeModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private loginService = inject(LoginService);
  private store = inject(Store)

  protected user = toSignal(this.store.select(UserState.getLoggedInUser));
  
  onLogout() {
    this.loginService.logOut();
  }
}
