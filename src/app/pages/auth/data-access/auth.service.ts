import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ILogin, AuthData } from '../../../core/models/auth.interfaces';
import { API_ENDPOINT } from '../../../core/constants';
import { StorageService } from '../../../core/data-access/storage.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetLoggedInUser } from '../../../core/store-ngxs/user.store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);  
  private storage: StorageService = inject(StorageService);
  private destroyRef = inject(DestroyRef)
private store = inject(Store)
  constructor() {}

  login(credentials: ILogin): Observable<AuthData> {
    console.log('credentials', credentials);
    return this.http.post<AuthData>(API_ENDPOINT.AUTH.LOGIN, credentials)
    .pipe(
      map((res) => {
        this.storage.setItem(res.data);
        return res;
      })
    );
  }


  logout() {    
    this.http.get(API_ENDPOINT.AUTH.LOGOUT)
      .pipe(
        map(() => {
          this.storage.removeItem();
          this.router.navigate(['auth', 'login']);
        }),
        takeUntilDestroyed(this.destroyRef))
      .subscribe();
  }
}
