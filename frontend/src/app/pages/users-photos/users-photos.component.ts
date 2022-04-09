import { Component, OnInit } from '@angular/core';
import { fetchUsersPhotosRequest } from '../../store/photos.actions';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { Photo } from '../../models/photo.model';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-users-photos',
  templateUrl: './users-photos.component.html',
  styleUrls: ['./users-photos.component.sass']
})
export class UsersPhotosComponent implements OnInit {
  photos!: Observable<null | Photo[]>;
  loading!: Observable<boolean>;
  env = environment;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {
    this.photos = store.select(state => state.photos.usersPhotos);
    this.loading = store.select(state => state.photos.fetchLoading);
  }


  ngOnInit(): void {
    const userId = this.route.snapshot.queryParams['user'];
    this.store.dispatch(fetchUsersPhotosRequest({userId}));
  }
}
