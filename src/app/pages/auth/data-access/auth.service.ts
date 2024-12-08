import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILogin, ILoginResponse } from '../../../core/models/auth.interfaces';
import { API_ENDPOINT } from '../../../core/constants';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);

  constructor() {}

  login(credentials: ILogin): Observable<ILoginResponse> {
    console.log('credentials',credentials);
    return this.http.post<ILoginResponse>(API_ENDPOINT.AUTH.LOGIN, credentials);
  }
}
