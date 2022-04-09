import { PhotosState } from './types';
import { createReducer, on } from '@ngrx/store';
import {
  fetchPhotosFailure,
  fetchPhotosRequest,
  fetchPhotosSuccess,
  postPhotoFailure,
  postPhotoRequest,
  postPhotoSuccess
} from './photos.actions';

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
  on(fetchPhotosRequest, (state) => ({...state, fetchLoading: true})),
  on(fetchPhotosSuccess, (state, {photos}) => ({...state, fetchLoading: false, photos})),
  on(fetchPhotosFailure, (state, {error}) => ({...state, fetchLoading: false, fetchError: error})),
  on(postPhotoRequest, (state) => ({...state, postLoading: true})),
  on(postPhotoSuccess, (state) => ({...state, postLoading: false})),
  on(postPhotoFailure, (state, {error}) => ({...state, postLoading: false, postError: error})),
);
