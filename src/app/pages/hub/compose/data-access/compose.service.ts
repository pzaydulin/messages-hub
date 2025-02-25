import {
  computed,
  inject,
  Injectable,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { GetAllUsers, GetLoggedInUser, UserState } from '../../../../core/store-ngxs/user.store';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ComposeService {
  private store: Store = inject(Store);

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
    return this.currentUser() ? users.filter((user) => user._id !== this.currentUser()?._id) : users;
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
}
