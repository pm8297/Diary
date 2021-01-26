import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { UserStatistic } from 'src/app/profile/user.model';
import { UserService } from 'src/app/profile/user.service';
import { Article } from '../article.model';
import { Comment, CommentStatistic } from '../comment.model';
import { ArticlesService } from '../articles.service';
import { CommentService } from '../comment.service';
import { Profile } from 'src/app/profile/profile.model';
import { ProfileService } from 'src/app/profile/profile.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from 'src/app/shared/dialog.service';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  token = localStorage.getItem('token');
  slug: string;
  article: Article;
  isLike: boolean = true;
  authorCurrent: string;
  userCurrent: string;
  canEdit: boolean;
  comments: Comment[];
  authorFollow: boolean;
  form: FormGroup;
  profile: Profile;
  userFollow: boolean;
  imgCurrent: string;
  isShow = false;
  isLogged: boolean;

  constructor(
    private authService: AuthService,
    private ac: ActivatedRoute,
    private articlesService: ArticlesService,
    private commentService: CommentService,
    private userService: UserService,
    private profileService: ProfileService,
    private fb: FormBuilder,
    private router: Router,
    private dialogService: DialogService,
    private snackBarService: SnackBarService
  ) {
    this.isLogged = this.authService.loggedIn();
    this.form = this.fb.group({
      comment: this.fb.group({
        body: ['', Validators.required],
      }),
    });
  }

  ngOnInit(): void {
    this.ac.params.subscribe((data) => {
      this.slug = data.slug;
      this.articlesService
        .getDetailArticle(this.slug)
        .subscribe((data: { article: Article }) => {
          this.article = data.article;
          this.authorCurrent = this.article.author.username;
          if (this.isLogged) {
            this.userService
              .getCurrentUser()
              .subscribe((data: UserStatistic) => {
                this.imgCurrent = data.user.image;
                this.userCurrent = data.user.username;
                this.canEdit = this.userCurrent === this.authorCurrent;
              });
          } else {
            this.canEdit = false;
          }
          this.profileService
            .getProfile(this.authorCurrent)
            .subscribe((data: { profile: Profile }) => {
              this.profile = data.profile;
              this.userFollow = this.profile.following;
            });
        });
      this.commentService
        .getAllComments(this.slug)
        .subscribe((comment: CommentStatistic) => {
          this.comments = comment.comments;
        });
    });
  }

  follow() {
    this.profileService
      .followProfile(this.authorCurrent)
      .subscribe((data: { profile: Profile }) => {
        this.userFollow = data.profile.following;
      });
  }
  unfollow() {
    this.profileService
      .unfollowProfile(this.authorCurrent)
      .subscribe((data: { profile: Profile }) => {
        this.userFollow = data.profile.following;
      });
  }

  toggleFollow(following: boolean) {
    if (!this.token) {
      this.router.navigate(['/', 'login']);
    } else {
      if (following) {
        this.unfollow();
      } else {
        this.follow();
      }
    }
  }
  liked(slug, favorited) {
    if (!this.isLogged) {
      this.router.navigate(['/', 'login']);
    } else {
      if (favorited) {
        this.articlesService.unfavoriteArticle(slug).subscribe(() => {
          this.setFavorite(favorited, slug);
        });
      } else {
        this.articlesService.favoriteArticle(slug).subscribe(() => {
          this.setFavorite(favorited, slug);
        });
      }
    }
  }

  setFavorite(value: boolean, slug) {
    if (this.article && this.article.slug === slug) {
      this.article.favorited = !value;
      const count = this.article.favoritesCount;
      this.article.favoritesCount = this.article.favorited
        ? count + 1
        : count - 1;
    }
  }

  onSubmit() {
    this.commentService
      .addComment(this.slug, this.form.value)
      .subscribe((comment: { comment: Comment }) => {
        this.form.reset();
        this.comments.unshift(comment.comment);
      });
  }

  articleDelete() {
    this.dialogService
      .openDialog('Are you sure to delete this article ?')
      .afterClosed()
      .subscribe((res: boolean) => {
        if (res) {
          this.articlesService.deleteArticle(this.slug).subscribe((data) => {
            this.router.navigate(['/', 'profile', this.authorCurrent]);
            this.snackBarService.openSnackBar('deleted article', 2, 'success');
          });
        }
      });
  }
  deleteComment(id) {
    this.dialogService
      .openDialog('Are you sure to delete this comment ?')
      .afterClosed()
      .subscribe((res: boolean) => {
        if (res) {
          this.commentService.deleteComment(id, this.slug).subscribe((data) => {
            this.comments = this.comments.filter((comments) => {
              return comments.id != id;
            });
            this.snackBarService.openSnackBar('deleted comment', 2, 'success');
          });
        }
      });
  }
}
