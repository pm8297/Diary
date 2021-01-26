import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesListComponent } from './articles-list/articles-list.component';
import { ArticlesComponent } from './articles/articles.component';
import { CommentComponent } from './comment/comment.component';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from '../auth/guard/auth.guard';
import { EditFormGuard } from '../auth/guard/edit-form.guard';
const routes: Routes = [
  {
    path: 'articles',
    children: [
      {
        path: ':slug',
        component: ArticlesComponent,
      },
    ],
  },
  {
    path: 'edit',
    component: EditComponent,
    canActivate: [AuthGuard],
    canDeactivate: [EditFormGuard],
  },
  {
    path: 'edit/:slug',
    component: EditComponent,
    canActivate: [AuthGuard],
    canDeactivate: [EditFormGuard],
  },
];

@NgModule({
  declarations: [
    ArticlesListComponent,
    ArticlesComponent,
    CommentComponent,
    EditComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [ArticlesListComponent],
})
export class ArticlesModule {}
