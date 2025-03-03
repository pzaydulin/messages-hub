import { computed, inject, Injectable, signal } from '@angular/core';
import { StorageService } from '../../../../core/data-access/storage.service';
import { HttpClient } from '@angular/common/http';
import { API_ENDPOINT } from '../../../../core/constants';
import { map, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { IMessage } from '../../../../core/models/message.interfaces';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IApiResponse } from '../../../../core/models/common.interfaces';
import { IUser } from '../../../../core/models/user.interfaces';
import { Store } from '@ngxs/store';
import { UserState } from '../../../../core/store-ngxs/user.store';
import { LoginService } from '../../../auth/login/data-access/login.service';

export type userSource = "localstorage" | "ngxs" 

interface messagesState {
  currentUser: IUser | undefined;
  messages: IMessage[]; 
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private http: HttpClient = inject(HttpClient);

  // I'm getting user info from localstorage or from NGxS state
  // I use this sources for study

  private messagesState = signal<messagesState>({
    currentUser: undefined,
    messages: [],
  });

  // selectors
  currentUser = computed(() => this.messagesState().currentUser);
  messages = computed(() => this.messagesState().messages);

  // get currentuser from localstorage
  private storage = inject(StorageService);

  // get currentuser from NgXs store
  private store: Store = inject(Store);

  // get currentuser from login.STATE
  // TODO:

  messages$ = new Subject<IMessage[]>();

  constructor() {
    const source: userSource = 'ngxs';

    this.messages$
      .pipe(
        switchMap(() => this.getCurrentUser(source)),
        switchMap((userData) => this.getMessages(userData)),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  getCurrentUser(source: userSource) {
    let user = undefined;
    if (source === 'localstorage') {
      user = this.storage.currentUser();
    } else if (source === 'ngxs') {
      return this.store.select(UserState.getLoggedInUser).pipe(
        //  map((u) => (user = u)),
        tap((user) => this.setUserData(user))
      );
    }
    this.setUserData(user);
    return of(user);
  }
  getMessages(userData: IUser | undefined): Observable<IMessage[]> {
    return userData
      ? this.http
          .get<IApiResponse<IMessage[]>>(
            API_ENDPOINT.MESSAGES.FILTER + '/' + userData._id + '/filter'
          )
          .pipe(
            map((d) => d.data),
            tap((messages) => this.setMessagesData(messages))
          )
      : of([] as IMessage[]);
  }

  setUserData(data: IUser | undefined) {
    this.messagesState.update((state) => ({
      ...state,
      currentUser: data,
    }));
  }

  setMessagesData(data: IMessage[]) {
    this.messagesState.update((state) => ({
      ...state,
      messages: data,
    }));
  }

  deleteMessage(data: IMessage) {
    return this.http.get(API_ENDPOINT.MESSAGES.DELETE + '/' + data._id + '/delete');
  }

  // this method using if get info from localstorage
  // loadMessages() {
  //   this.messages$.next([]);
  // }

}
