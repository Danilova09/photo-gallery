import { Component, OnInit } from '@angular/core';
import { PhotosService } from '../../services/photos.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.sass']
})
export class PhotosComponent implements OnInit {

  constructor(private pService: PhotosService) { }

  ngOnInit(): void {
    this.pService.getPhotos();
  }

}
