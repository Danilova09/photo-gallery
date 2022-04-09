import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { ToolbarComponent } from './pages/toolbar/toolbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { FlexModule } from '@angular/flex-layout';
import { HasRolesDirective } from './directives/has-roles.directive';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from 'angularx-social-login';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AppStoreModule } from './app-store.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FileInputComponent } from './ui/file-input/file-input.component';
import { CenteredCardComponent } from './ui/centered-card/centered-card.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { PhotosComponent } from './pages/photos/photos.component';
import { PhotoFormComponent } from './pages/photo-form/photo-form.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UsersPhotosComponent } from './pages/users-photos/users-photos.component';
import { UsersPersonalPhotosComponent } from './pages/users-personal-photos/users-personal-photos.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './ui/dialog/dialog.component';


const socialConfig: SocialAuthServiceConfig = {
  autoLogin: false,
  providers: [
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider(environment.fbAppId, {
        scope: 'email,public_profile'
      })
    }
  ]
};


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterFormComponent,
    ToolbarComponent,
    HasRolesDirective,
    FileInputComponent,
    CenteredCardComponent,
    PhotosComponent,
    PhotoFormComponent,
    UsersPhotosComponent,
    UsersPersonalPhotosComponent,
    DialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    FlexModule,
    MatMenuModule,
    MatCardModule,
    SocialLoginModule,
    AppStoreModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: 'SocialAuthServiceConfig', useValue: socialConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
