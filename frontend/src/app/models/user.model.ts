export interface RegisterUserData {
  [key: string]: any,
  displayName: string,
  email: string,
  avatar: File | null,
  password: string,
}

export interface User {
  _id: string,
  displayName: string,
  email: string,
  avatar: string,
  role: string,
  token: string,
  facebookId: undefined | string,
}

export interface LoginUserData {
  email: string,
  password: string,
}

export interface LoginError {
  error: string;
}

export interface FieldError {
  message: string,
}

export interface RegisterError {
  errors: {
    password: FieldError,
    email: FieldError,
  };
}
