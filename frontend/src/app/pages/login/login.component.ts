import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Observable, Subscription } from 'rxjs';
import { LoginError, LoginUserData, User } from '../../models/user.model';
import { loginUserRequest, loginWithFbRequest } from '../../store/users.actions';
import { FacebookLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  user!: null | User;
  loading: Observable<boolean>;
  error: Observable<null | LoginError>;
  authStateSub!: Subscription;
  sub!: Subscription;
  userData!: SocialUser;

  constructor(
    private store: Store<AppState>,
    private auth: SocialAuthService,
  ) {
    this.loading = store.select(state => state.users.loginLoading);
    this.error = store.select(state => state.users.loginError);
    store.select(state => state.users.user).subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.authStateSub = this.auth.authState.subscribe((userData: SocialUser) => {
      this.userData = userData;
      this.store.dispatch(loginWithFbRequest({userData: this.userData}));
    });
  }

  onSubmit() {
    const userData: LoginUserData = this.form.value;
    this.store.dispatch(loginUserRequest({userData}));
  }

  fbLogin() {
    void this.auth.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  ngOnDestroy(): void {
    this.authStateSub.unsubscribe();
  }
}

