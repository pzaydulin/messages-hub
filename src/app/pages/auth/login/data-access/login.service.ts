import { computed, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AuthService } from '../../data-access/auth.service';
import { catchError, delay, EMPTY, Observable, of, Subject, switchMap, tap } from 'rxjs';
import { AuthData, ILogin, IUser } from '../../../../core/models/auth.interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { setErrorMessage } from '../../../../shared/utils/error.utils';

export type LoginStatus = 'pending' | 'authenticating' | 'error';

interface LoginState {
  status: LoginStatus;
  currentUser: IUser | undefined ;
  error: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private authService = inject(AuthService);

  // Initial state
  private state = signal<LoginState>({
    status: 'pending',
    currentUser: undefined,
    error: '',
  });

  // Selectors
  status = computed(() => this.state().status);
  currentUser = computed(() => this.state().currentUser);
  errorMessage = computed(() => this.state().error);

  // Sources
  login$ = new Subject<ILogin>();

  constructor() {
    // Reducers
    this.login$
      .pipe(
        tap(() => this.setLoadingIndicator('authenticating')),
        switchMap((credentials) =>
          this.getAuthData(credentials).pipe(
            tap((authData) => this.setUserData(authData))
          )
        ),
        // To better see the loading message
        delay(1000),
        takeUntilDestroyed()
      )
      .subscribe();
  }

  private setLoadingIndicator(status: LoginStatus): void {
    this.state.update((state) => ({
      ...state,
      status,
    }));
  }

  private getAuthData(credentials: ILogin): Observable<AuthData> {
    return this.authService
      .login(credentials)
      .pipe(catchError((err) => this.setError(err)));
  }

  private setUserData(authData: AuthData): void {
    this.state.update((state) => ({
      ...state,
      status: 'authenticating',
      currentUser: authData.data,
      error: "",
    }));
  }

  private setError(err: HttpErrorResponse): Observable<never> {
    const errorMessage = setErrorMessage(err);
    this.state.update((state) => ({
      ...state,
      status: 'error',
      currentUser: undefined,
      error: errorMessage,
    }));
    return EMPTY;
  }

  signIn(credentials: ILogin): void {
    this.login$.next(credentials);
  };

  logOut():void {
    this.state.update((state) => ({
      ...state, 
      status: 'pending',
      currentUser: undefined,
      error: ""
    }));
    this.authService.logout();
  }
}
