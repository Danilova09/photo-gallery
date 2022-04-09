import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from '../../models/photo.model';
import { environment } from '../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { deletePhotoRequest, fetchUsersPhotosRequest } from '../../store/photos.actions';
import { PhotosService } from '../../services/photos.service';

@Component({
  selector: 'app-users-personal-photos',
  templateUrl: './users-personal-photos.component.html',
  styleUrls: ['./users-personal-photos.component.sass']
})
export class UsersPersonalPhotosComponent implements OnInit {
  photos!: Observable<null | Photo[]>;
  loading!: Observable<boolean>;
  userId!: string;
  env = environment;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private photosService: PhotosService,
  ) {
    this.photos = store.select(state => state.photos.usersPhotos);
    this.loading = store.select(state => state.photos.fetchLoading);
  }


  ngOnInit(): void {
    this.userId = this.route.snapshot.queryParams['user'];
    this.store.dispatch(fetchUsersPhotosRequest({userId: this.userId}));
  }

  delete(photoId: string) {
    this.store.dispatch(deletePhotoRequest({photoId}));
  }
}
