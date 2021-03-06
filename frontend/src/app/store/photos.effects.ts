import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PhotosService } from '../services/photos.service';
import { Router } from '@angular/router';
import { HelpersService } from '../services/helpers.service';
import {
  deletePhotoRequest,
  deletePhotoSuccess,
  fetchPhotosFailure,
  fetchPhotosRequest,
  fetchPhotosSuccess,
  fetchUsersPhotosFailure,
  fetchUsersPhotosRequest,
  fetchUsersPhotosSuccess,
  postPhotoFailure,
  postPhotoRequest,
  postPhotoSuccess
} from './photos.actions';
import { catchError, mergeMap, of, tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from './types';
import { User } from '../models/user.model';

@Injectable()
export class PhotosEffects {
  user!: null | User;

  constructor(
    private actions: Actions,
    private photosService: PhotosService,
    private router: Router,
    private helpers: HelpersService,
    private store: Store<AppState>,
  ) {
    store.select(state => state.users.user).subscribe(user => {
      this.user = user;
    });
  }

  fetchPhotos = createEffect(() => this.actions.pipe(
    ofType(fetchPhotosRequest),
    mergeMap(() => this.photosService.getPhotos().pipe(
      map((photos) => fetchPhotosSuccess({photos})),
      catchError((error) => of(fetchPhotosFailure({error})))
    ))
  ));

  postPhoto = createEffect(() => this.actions.pipe(
      ofType(postPhotoRequest),
      mergeMap(({photoData}) => this.photosService.postPhoto(photoData).pipe(
        map(photo => postPhotoSuccess({photo})),
        tap(({photo}) => {
          this.helpers.openSnackbar('Photo posted!');
          void this.router.navigate(['users-personal-photos'], {queryParams: {user: this.user!._id}});
        }),
        this.helpers.catchServerError(postPhotoFailure)
      ))
    )
  );

  deletePhoto = createEffect(() => this.actions.pipe(
    ofType(deletePhotoRequest),
    mergeMap(({photoId}) => this.photosService.deletePhoto(photoId).pipe(
      map(() => deletePhotoSuccess()),
      tap(() => {
        this.helpers.openSnackbar('Photo deleted!');
        this.store.dispatch(fetchUsersPhotosRequest({userId: this.user!._id}));
      }),
      this.helpers.catchServerError(deletePhotoRequest)
    ))
  ));

  fetchUsersCocktails = createEffect(() => this.actions.pipe(
    ofType(fetchUsersPhotosRequest),
    mergeMap(({userId}) => this.photosService.getUsersPhotos(userId).pipe(
      map((photos) => fetchUsersPhotosSuccess({photos})),
      this.helpers.catchServerError(fetchUsersPhotosFailure),
    ))
  ));
}
