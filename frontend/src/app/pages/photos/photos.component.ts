import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Photo } from '../../models/photo.model';
import { environment } from '../../../environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/types';
import { fetchPhotosRequest } from '../../store/photos.actions';
import { HelpersService } from '../../services/helpers.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.sass']
})
export class PhotosComponent implements OnInit {
  photos!: Observable<Photo[]>;
  loading!: Observable<boolean>;
  env = environment;

  constructor(
    private store: Store<AppState>,
    private helpersService: HelpersService,
  ) {
    this.photos = store.select(state => state.photos.photos);
    this.loading = store.select(state => state.photos.fetchLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchPhotosRequest());
  }

  openDialog(photo: Photo) {
    this.helpersService.openDialog(photo);
  }
}
