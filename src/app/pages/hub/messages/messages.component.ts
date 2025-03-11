import { Component, computed, effect, inject, Input, input, signal } from '@angular/core';
import { CardComponent } from '../../../shared/components/card/card.component';
import { MessageItemComponent } from './ui/message-item/message-item.component';
import { MessageService } from './data-access/message.service';
import { CommonModule } from '@angular/common';
import { Store } from '@ngxs/store';
import { GetLoggedInUser, UserState } from '../../../core/store-ngxs/user.store';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { GetMessages, MessageState } from '../../../core/store-ngxs/message.store';
import { tap } from 'rxjs';
import { IMessage } from '../../../core/models/message.interfaces';
import { MessageType } from '../../../core/models/common.interfaces';
import { DialogModule } from 'primeng/dialog';
import { MessageService as ToastService } from 'primeng/api';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-messages',
  standalone: true,
  imports: [CommonModule, CardComponent, MessageItemComponent, DialogModule, ToastModule],
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent {
  private store: Store = inject(Store);
  private messageService: MessageService = inject(MessageService);
  private toastService: ToastService = inject(ToastService);
  private router: Router = inject(Router);

  ////////////////////////////////
  // DATA WITHOUT USING NGXS

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

  // DATA FROM NGXS STATE

  // getting type from router data
  type = input<MessageType>('inbox');

  user = toSignal(this.store.select(UserState.getLoggedInUser));
  messages = toSignal(this.store.select(MessageState.getAllMessages), {
    initialValue: [] as IMessage[],
  });

  constructor() {
    if (!this.user()) {
      this.store
        .dispatch(new GetLoggedInUser())
        .pipe(
          tap(() => {
            this.store.dispatch(new GetMessages());
          })
          // takeUntilDestroyed()
        )
        .subscribe();
    }
  }

  filterMessages = {
    inbox: () => {
      return this.messages().filter(
        (message) => message.status !== 3 && message.to._id === this.user()?._id
      );
    },
    sent: () => {
      return this.messages().filter(
        (message) =>
          message.status !== 3 && message.sender._id === this.user()?._id
      );
    },
    trash: () => {
      return this.messages().filter((message) => message.status === 3);
    },
  };

  filteredMessages = computed(() => {
    return this.filterMessages[this.type()]();
  });

  protected currentMessage = signal({} as IMessage);
  showModal: boolean = false;

  
  readMessage(message: IMessage) {
    this.showModal = true;
    this.currentMessage.set(message);       

    // if message is already read, do not send request to server
    if(message.status === 2 || message.status === 3) {
      return;
    }

    this.messageService.readMessage(message).subscribe({
      next: () => {
        this.store.dispatch(new GetMessages());
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.statusText,
        });
      }
    })
  }


  deleteMessage(message: IMessage) {
    this.messageService.deleteMessage(message).subscribe({
      next: (response) => {
        this.toastService.add({
          severity: 'warn',
          summary: 'Warn',
          detail: 'Message is marked as deleted and moved to Trash',
        });
        this.store.dispatch(new GetMessages());
        this.router.navigate(['hub/inbox']);
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.statusText,
        });
      }
    });
  }

}
