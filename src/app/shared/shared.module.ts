import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { TagsComponent } from './tags/tags.component';
import { BtnFavoriteComponent } from './btn-favorite/btn-favorite.component';
import { NotificationComponent } from './notification/notification.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmComponent } from './confirm/confirm.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AngularEditorModule } from '@kolkov/angular-editor';
@NgModule({
  declarations: [
    PaginationComponent,
    TagsComponent,
    NotificationComponent,
    BtnFavoriteComponent,
    ConfirmComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
  ],
  exports: [
    PaginationComponent,
    TagsComponent,
    NotificationComponent,
    BtnFavoriteComponent,
    ConfirmComponent,
    MatCardModule,
    MatTabsModule,
    MatInputModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    AngularEditorModule,
  ],
})
export class SharedModule {}
