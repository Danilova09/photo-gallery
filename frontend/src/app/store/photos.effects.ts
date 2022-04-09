import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PhotosService } from '../services/photos.service';
import { Router } from '@angular/router';
import { HelpersService } from '../services/helpers.service';
import { postPhotoFailure, postPhotoRequest, postPhotoSuccess } from './photos.actions';
import { mergeMap, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from './types';
import { User } from '../models/user.model';

@Injectable()
export class PhotosEffects {
  user!: undefined | null | User;

  constructor(
    private actions: Actions,
    private photosService: PhotosService,
    private router: Router,
    private helpers: HelpersService,
    private store: Store<AppState>,
  ) {
  }

  postPhoto = createEffect(() => this.actions.pipe(
      ofType(postPhotoRequest),
      mergeMap(({photoData}) => this.photosService.postPhoto(photoData).pipe(
        map(photo => postPhotoSuccess({photo})),
        tap(({photo}) => {
          this.helpers.openSnackbar('Photo posted!');
          void this.router.navigate(['/']);
        }),
        this.helpers.catchServerError(postPhotoFailure)
      ))
    )
  );
}
