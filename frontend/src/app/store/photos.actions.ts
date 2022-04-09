import { createAction, props } from '@ngrx/store';
import { Photo, PhotoData } from '../models/photo.model';


export const fetchPhotosRequest = createAction('[Photos] Fetch Request');
export const fetchPhotosSuccess = createAction('[Photos] Fetch Success', props<{ photos: Photo[] }>());
export const fetchPhotosFailure = createAction('[Photos] Fetch Failure', props<{ error: string }>());

export const postPhotoRequest = createAction('[Photos] Post Photo Request', props<{ photoData: PhotoData }>());
export const postPhotoSuccess = createAction('[Photos] Post Photo Success', props<{ photo: Photo }>());
export const postPhotoFailure = createAction('[Photos] Post Photo Failure', props<{ error: string }>());
