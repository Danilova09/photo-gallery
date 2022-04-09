import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Photo } from '../../models/photo.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.sass']
})
export class DialogComponent {
  env = environment;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: Photo,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
