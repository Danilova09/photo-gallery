import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { LoginComponent } from './pages/login/login.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { PhotoFormComponent } from './pages/photo-form/photo-form.component';
import { RoleGuardService } from './services/role-guard.service';
import { UsersPhotosComponent } from './pages/users-photos/users-photos.component';
import { UsersPersonalPhotosComponent } from './pages/users-personal-photos/users-personal-photos.component';

const routes: Routes = [
  {path: '', component: PhotosComponent},
  {path: 'register', component: RegisterFormComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'new-photo', component: PhotoFormComponent,
    canActivate: [RoleGuardService],
    data: {roles: ['admin', 'user']}
  },
  {path: 'users-photos', component: UsersPhotosComponent},
  {path: 'users-personal-photos', component: UsersPersonalPhotosComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
