import {
  computed,
  inject,
  Injectable,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { GetAllUsers, GetLoggedInUser, UserState } from '../../../../core/store-ngxs/user.store';
import { toSignal } from '@angular/core/rxjs-interop';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { IMessage } from '../../../../core/models/message.interfaces';
import { API_ENDPOINT } from '../../../../core/constants';
import { MessageService as ToastService } from 'primeng/api';
import { GetMessages } from '../../../../core/store-ngxs/message.store';
import { Router } from '@angular/router';
import { SocketService } from '../../../../core/data-access/socket.service';

@Injectable({
  providedIn: 'root',
})
export class ComposeService {
  private store: Store = inject(Store);
  private router: Router = inject(Router);
  private http: HttpClient = inject(HttpClient);

  private toastService: ToastService = inject(ToastService);
  private socketService: SocketService = inject(SocketService);

  // The source signal with users
  private _users = toSignal(this.store.select(UserState.getUsers), {
    initialValue: [],
  });

  // Computable value that checks the condition and dispatches the action if necessary
  users = computed(() => {
    const users = this._users();
    if (!users.length) {
      this.store.dispatch(new GetAllUsers());
    }
    // Filter out the current user from the list of users
    return this.currentUser()
      ? users.filter((user) => user._id !== this.currentUser()?._id)
      : users;
  });

  private _user = toSignal(this.store.select(UserState.getLoggedInUser), {
    initialValue: undefined,
  });

  currentUser = computed(() => {
    if (!this._user) {
      this.store.dispatch(new GetLoggedInUser());
    }
    return this._user();
  });

  sentMessage(data: IMessage) {
    return this.http
      .post<IMessage>(API_ENDPOINT.MESSAGES.CREATE, data)
      .subscribe({
        next: () => {
          this.showMessage('success', 'Success', 'Message sent successfully');
          this.store.dispatch(new GetMessages());
          this.socketService.sentMessage('socket message');
          // timeout 3 seconds need for show toast message
          setTimeout(() => {
            this.router.navigate(['hub/inbox']);
          }, 3000);
        },
        error: (error: HttpErrorResponse) => {
          console.log('error', error);

          this.showMessage('error', 'Error', error.statusText);
        },
      });
  }

  showMessage(severity: string, summary: string, detail: string) {
    this.toastService.add({
      severity,
      summary,
      detail,
    });
  }
}
