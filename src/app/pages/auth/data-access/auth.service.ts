import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ILogin, AuthData } from '../../../core/models/auth.interfaces';
import { API_ENDPOINT } from '../../../core/constants';
import { StorageService } from '../../../core/data-access/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private storage: StorageService = inject(StorageService);

  constructor() {}

  login(credentials: ILogin): Observable<AuthData> {
    console.log('credentials', credentials);
    return this.http.post<AuthData>(API_ENDPOINT.AUTH.LOGIN, credentials).pipe(
      map((res) => {
        this.storage.setItem(res.data);
        return res;
      })
    );
  }


  logout() {
    this.storage.removeItem();
    // return this.http.get(API_ENDPOINT.AUTH.LOGOUT);
  }
}
