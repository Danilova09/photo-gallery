import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppStoreModule } from '../../app-store.module';
import { AppState } from '../../store/types';
import { PhotosService } from '../../services/photos.service';
import { postPhotoRequest } from '../../store/photos.actions';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.sass']
})
export class PhotoFormComponent implements OnInit {
  @ViewChild('f') photoForm!: NgForm;
  imageError: Boolean = false;
  userId!: string | undefined;

  constructor(
    private store: Store<AppState>,
    private photosService: PhotosService,
  ) {
    store.select(state => state.users.user).subscribe(user => {
      this.userId = user?._id;
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    const image = this.photoForm.controls['image'].value;
    this.imageError = !image ? true : false;
    if (this.photoForm.valid) {
      const photoData = {...this.photoForm.value, user: this.userId};
      this.store.dispatch(postPhotoRequest({photoData}));
    }
  }
}
