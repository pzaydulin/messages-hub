import { inject, Injectable } from '@angular/core';
import { IUser } from '../models/user.interfaces';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { UserService } from '../../pages/auth/data-access/user.service';
import { tap } from 'rxjs';

export class GetAllUsers {
  static readonly type = '[User] Get All';
}

export class GetLoggedInUser {
  static readonly type = '[User] Get Logged In';
}

export class ClearUsersData {
  static readonly type = '[User] Clear Data';
}

export interface UserStateModel {
  users: IUser[];
  user: IUser | undefined;
}

@State<UserStateModel>({
  name: 'user',
  defaults: {
    users: [],
    user: undefined,
  },
})
@Injectable()
export class UserState {
  private userService: UserService = inject(UserService);

  @Action(GetLoggedInUser)
  getLoggedInUser(ctx: StateContext<UserStateModel>) {
    return this.userService.getLoggedInUser().pipe(
      tap((currentUser) => {
        // const state = ctx.getState();
        ctx.patchState({
          user: currentUser,
        });
      })
    );
  }

  @Action(GetAllUsers)
  getAllUsers(ctx: StateContext<UserStateModel>) {
    return this.userService.getAllUsers().pipe(
      tap((users) =>
        ctx.patchState({
          users,
        })
      )
    );
  }

  @Action(ClearUsersData)
  clearUsersData(ctx: StateContext<UserStateModel>) {
    ctx.patchState({
      users: [],
      user: undefined,
    });
  }

  @Selector([UserState])
  static getUsers(state: UserStateModel) {
    return state.users;
  }

  @Selector()
  static getLoggedInUser(state: UserStateModel) {
    return state.user;
  }
}
