import { User } from './user.model';

export interface Photo {
  _id: string,
  user: User,
  title: string,
  image: string,
}

export interface PhotoData {
  [key: string]: any,
  _id: string,
  user: string,
  title: string,
  image: File,
}
