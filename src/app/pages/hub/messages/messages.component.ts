import { Component, inject, OnInit } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MessageItemComponent } from './ui/message-item/message-item.component';
import { MessageService } from './data-access/message.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { GetLoggedInUser } from '../../../core/store-ngxs/user.store';
import { LoginService } from '../../auth/login/data-access/login.service';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, CardComponent, MessageItemComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent implements OnInit {
  private messageService: MessageService = inject(MessageService);
  private store: Store = inject(Store);

  private loginState = inject(LoginService);


  messages = this.messageService.messages;
  user = this.messageService.currentUser;

  constructor() {
    if (!this.user()) {
      // if using NGxS need to dispatch to get userinfo;
      this.store.dispatch(new GetLoggedInUser());
    }
  }
  ngOnInit() {
    this.messageService.loadMessages();
  }
}
