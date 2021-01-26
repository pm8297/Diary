import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { NotificationComponent } from './notification/notification.component';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private snackBar: MatSnackBar) {}

  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  openSnackBar(
    mess: string,
    durationInSeconds: number,
    clazz: 'error' | 'success'
  ) {
    return this.snackBar.openFromComponent(NotificationComponent, {
      duration: durationInSeconds * 1000,
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      panelClass: clazz,
      data: {
        message: mess,
        type: clazz,
      },
    });
  }
}
