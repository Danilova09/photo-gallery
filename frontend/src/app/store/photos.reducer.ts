import { PhotosState } from './types';
import { createReducer, on } from '@ngrx/store';
import { postPhotoFailure, postPhotoRequest, postPhotoSuccess } from './photos.actions';

const initialState: PhotosState = {
  usersPhotos: [],
  photos: [],
  fetchLoading: false,
  fetchError: null,
  postLoading: false,
  postError: null,
};

export const photosReducer = createReducer(
  initialState,
  on(postPhotoRequest, (state) => ({...state, postLoading: true})),
  on(postPhotoSuccess, (state) => ({...state, postLoading: false})),
  on(postPhotoFailure, (state, {error}) => ({...state, postLoading: false, postError: error})),
);
