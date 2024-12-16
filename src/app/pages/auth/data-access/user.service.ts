import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthData } from '../../../core/models/auth.interfaces';
import { API_ENDPOINT } from '../../../core/constants';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, Observable, tap } from 'rxjs';
import { IUser } from '../../../core/models/user.interfaces';
import { IApiResponse } from '../../../core/models/common.interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private http = inject(HttpClient);

  // users = toSignal(this.getAllUsers(), {
  //   initialValue: [],
  // });
  // currentUser = toSignal(this.getLoggedInUser(), {
  //   initialValue: null,
  // });

  getAllUsers(): Observable<IUser[]> {
    return this.http
      .get<IApiResponse<IUser[]>>(API_ENDPOINT.USERS.ALL)
      .pipe(map((d) => d.data));
  }

  getLoggedInUser(): Observable<IUser> {
    return this.http
      .get<AuthData>(API_ENDPOINT.AUTH.ME)
      .pipe(map((d) => d.data));
  }
}
