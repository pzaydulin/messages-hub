import { Component, inject } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MessageItemComponent } from '../../../shared/components/message-item/message-item.component';
import { LoginService } from '../../auth/login/data-access/login.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CardComponent, MessageItemComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css'
})
export class MessagesComponent {
  private loginservice = inject(LoginService);

  constructor() {
    console.log('Is logged in:', this.loginservice.currentUser());
  }
}
