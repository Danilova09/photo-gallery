import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  constructor(private http: HttpClient) { }

  getPhotos() {
    this.http.get(env.apiUrl + '/photos').subscribe(response => {
      console.log(response);
    });
  }
}
