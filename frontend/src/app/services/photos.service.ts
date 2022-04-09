import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env} from '../../environments/environment';
import { Photo, PhotoData } from '../models/photo.model';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http: HttpClient) { }

  getPhotos() {
    return this.http.get<Photo[]>(env.apiUrl + '/photos');
  }

  postPhoto(photoData: PhotoData) {
    const formData = new FormData();
    Object.keys(photoData).forEach(key => {
      if (photoData[key] !== null) formData.append(key, photoData[key]);
    });
    return this.http.post<Photo>(env.apiUrl + '/photos', formData);
  }
}
