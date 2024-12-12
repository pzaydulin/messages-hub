import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IUser } from '../../../core/models/auth.interfaces';
import { API_ENDPOINT } from '../../../core/constants';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private http = inject(HttpClient);

  users = toSignal(this.http.get<IUser[]>(API_ENDPOINT.USERS.ALL), {initialValue: []})
  
}
