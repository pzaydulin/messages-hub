import { Component, inject } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MessageItemComponent } from './ui/message-item/message-item.component';
import { MessageService } from './data-access/message.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { GetLoggedInUser, UserState } from '../../../core/store-ngxs/user.store';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { GetMessages, MessageState } from '../../../core/store-ngxs/message.store';
import { tap } from 'rxjs';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, CardComponent, MessageItemComponent],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent {
  private store: Store = inject(Store);
  
  ////////////////////////////////
  // getting data without using NgxS

  // private messageService: MessageService = inject(MessageService);

  // messages = this.messageService.messages;
  // user = this.messageService.currentUser;

  // constructor() {
  //   if (!this.user()) {
  //     // if data from NGxS state is used to obtain userInfo, an action must be sent
  //     this.store.dispatch(new GetLoggedInUser());
  //   }
  // }
  // ngOnInit() {
  //   this.messageService.loadMessages();
  // }

  //
  ////////////////////////////////

  // getting data using NgxS

  user = toSignal(this.store.select(UserState.getLoggedInUser));
  messages = toSignal(this.store.select(MessageState.getAllMessages));

  constructor() {
    if (!this.user()) {
      this.store.dispatch(new GetLoggedInUser()).pipe(
        tap(() => {
          this.store.dispatch(new GetMessages());
        }),
        // takeUntilDestroyed()
      ).subscribe()
    }   
  }

}
