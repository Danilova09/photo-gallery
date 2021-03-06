import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import {
  loginUserFailure,
  loginUserRequest,
  loginUserSuccess,
  loginWithFbRequest,
  logoutUser,
  logoutUserRequest,
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess,
} from './users.actions';
import { map, mergeMap, tap } from 'rxjs';
import { HelpersService } from '../services/helpers.service';
import { SocialAuthService } from 'angularx-social-login';
import { User } from '../models/user.model';
import { AppState } from './types';
import { Store } from '@ngrx/store';

@Injectable()
export class UsersEffects {
  user!: null | User;

  constructor(
    private actions: Actions,
    private usersService: UsersService,
    private router: Router,
    private helpers: HelpersService,
    private auth: SocialAuthService,
    private store: Store<AppState>,
  ) {
    store.select(state => state.users.user).subscribe(user => {
      this.user = user;
    })
  }

  registerUser = createEffect(() => this.actions.pipe(
    ofType(registerUserRequest),
    mergeMap(({userData}) => this.usersService.registerUser(userData).pipe(
      map(user => registerUserSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Register successful');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(registerUserFailure)
    ))
  ));

  loginUser = createEffect(() => this.actions.pipe(
    ofType(loginUserRequest),
    mergeMap(({userData}) => this.usersService.login(userData).pipe(
      map(user => loginUserSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Login successful');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(loginUserFailure)
    ))
  ));

  loginWithFb = createEffect(() => this.actions.pipe(
    ofType(loginWithFbRequest),
    mergeMap(({userData}) => this.usersService.loginWithFb(userData).pipe(
      map(user => loginUserSuccess({user})),
      tap(() => {
        this.helpers.openSnackbar('Login successful');
        void this.router.navigate(['/']);
      }),
      this.helpers.catchServerError(loginUserFailure)
    ))
  ));

  logoutUser = createEffect(() => this.actions.pipe(
    ofType(logoutUserRequest),
    mergeMap(() => {
      return this.usersService.logout().pipe(
        map(() => logoutUser()),
        tap(() => {
          void this.router.navigate(['/']);
          if (this.user?.facebookId) {
            void this.auth.signOut();
          }
          this.helpers.openSnackbar('Logout successful');
        })
      );
    }))
  );
}
