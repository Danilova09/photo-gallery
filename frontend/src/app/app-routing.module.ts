import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterFormComponent } from './pages/register-form/register-form.component';
import { LoginComponent } from './pages/login/login.component';
import { PhotosComponent } from './pages/photos/photos.component';
import { PhotoFormComponent } from './pages/photo-form/photo-form.component';

const routes: Routes = [
  {path: '', component: PhotosComponent},
  {path: 'register', component: RegisterFormComponent},
  {path: 'login', component: LoginComponent},
  {path: 'new-photo', component: PhotoFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
