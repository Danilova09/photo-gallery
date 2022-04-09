import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-photo-form',
  templateUrl: './photo-form.component.html',
  styleUrls: ['./photo-form.component.sass']
})
export class PhotoFormComponent implements OnInit {
  @ViewChild('f') photoForm!: NgForm;
  imageError: Boolean = false;

  constructor(
  ) {}

  ngOnInit(): void {
  }

  onSubmit() {
    const image = this.photoForm.controls['image'].value;
    this.imageError = !image ? true : false;
    if (this.photoForm.valid) {
      const photoData = this.photoForm.value;
      console.log(photoData);
    }
  }
}
