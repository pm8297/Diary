import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmComponent } from './confirm/confirm.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDialog(mess: string) {
    return this.dialog.open(ConfirmComponent, {
      width: '300px',
      disableClose: true,
      data: {
        message: mess,
      },
    });
  }
}
