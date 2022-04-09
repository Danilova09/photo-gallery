import { LoginError, RegisterError, User } from '../models/user.model';
import { Photo } from '../models/photo.model';

export type UsersState = {
  user: null | User,
  registerLoading: boolean,
  registerError: null | RegisterError,
  loginLoading: boolean,
  loginError: null | LoginError,
}


export type PhotosState = {
  usersPhotos: null | Photo[],
  photos: Photo[],
  fetchLoading: boolean,
  fetchError: null | string,
  postLoading: boolean,
  postError: null | string,
}

export type AppState = {
  users: UsersState,
  photos: PhotosState
}
