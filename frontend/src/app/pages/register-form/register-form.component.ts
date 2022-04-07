import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppState } from '../../store/types';
import { Store } from '@ngrx/store';
import { registerUserRequest } from '../../store/users.actions';
import { Observable, Subscription } from 'rxjs';
import { RegisterError } from '../../models/user.model';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.sass']
})
export class RegisterFormComponent implements AfterViewInit, OnDestroy {
  @ViewChild('f') form!: NgForm;
  loading!: Observable<boolean>;
  error!: Observable<null| RegisterError>;
  errorSub!: Subscription;

  constructor(private store: Store<AppState>) {
    this.error = store.select(state => state.users.registerError);
    this.loading = store.select(state => state.users.registerLoading);
  }

  ngAfterViewInit(): void {
    this.errorSub = this.error.subscribe(error => {
      if (error) {
        const msg = error.errors.email.message;
        console.log(msg);
        this.form.form.get('email')?.setErrors({serverError: msg});
      } else {
        this.form.form.get('email')?.setErrors({});
      }
    });
  }

  onSubmit() {
    const userData = this.form.value;
    this.store.dispatch(registerUserRequest({userData}));
  }

  ngOnDestroy(): void {
    this.errorSub.unsubscribe();
  }
}
