import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { postPhotoRequest } from '../../store/photos.actions';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.sass']
})
export class PhotoFormComponent {
  @ViewChild('f') photoForm!: NgForm;
  imageError: Boolean = false;
  userId!: string | undefined;

  constructor(
    private store: Store<AppState>,
  ) {
    store.select(state => state.users.user).subscribe(user => {
      this.userId = user?._id;
    });
  }

  onSubmit() {
    const image = this.photoForm.controls['image'].value;
    this.imageError = !image;
    if (this.photoForm.valid) {
      const photoData = {...this.photoForm.value, user: this.userId};
      this.store.dispatch(postPhotoRequest({photoData}));
    }
  }
}
