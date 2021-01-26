import { Profile } from './../profile.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from '../profile.service';
import { ArticlesService } from 'src/app/articles/articles.service';
import { UserService } from '../user.service';
import { UserStatistic } from 'src/app/profile/user.model';
import { PageEvent } from '@angular/material/paginator';
import { ArticleStatistic } from 'src/app/articles/article.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profiles: Profile;
  author: string;
  token = localStorage.getItem('token');
  isUser: boolean;
  userCurrent: string;
  username: string;
  userProfile: string;
  authorArt: ArticleStatistic;
  authFa: ArticleStatistic;
  userFollow: boolean;
  constructor(
    private ac: ActivatedRoute,
    private profileService: ProfileService,
    private articlesService: ArticlesService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ac.params.subscribe((data) => {
      this.username = data.username;
      this.profileService
        .getProfile(this.username)
        .subscribe((data: { profile: Profile }) => {
          this.profiles = data.profile;
          this.userProfile = this.profiles.username;
          this.userFollow = this.profiles.following;

          if (!!localStorage.getItem('token') == true) {
            this.userService
              .getCurrentUser()
              .subscribe((data: UserStatistic) => {
                this.userCurrent = data.user.username;
                this.isUser = this.userCurrent == this.userProfile;
              });
          } else {
            this.isUser = false;
          }
        });

      this.getArticleByAuthor();
      this.getArticleByAuthorFavorite();
    });
  }

  getArticleByAuthor(limit = '10', offset = '0') {
    this.articlesService
      .getArticleByAuthor(this.username, limit, offset)
      .subscribe((data: ArticleStatistic) => {
        this.authorArt = data;
      });
  }

  getArticleByAuthorFavorite(limit = '10', offset = '0') {
    this.articlesService
      .getArticleByAuthorFavorite(this.username, limit, offset)
      .subscribe((data: ArticleStatistic) => {
        this.authFa = data;
      });
  }
  changePaging(event: PageEvent, type: string) {
    const offset = event.pageIndex * event.pageSize;
    switch (type) {
      case 'myArticle':
        this.getArticleByAuthor(event.pageSize + '', offset + '');
        break;
      case 'favoriteArticle':
        this.getArticleByAuthorFavorite(event.pageSize + '', offset + '');
        break;
      default:
        break;
    }
  }

  follow() {
    this.profileService
      .followProfile(this.userProfile)
      .subscribe((data: { profile: Profile }) => {
        this.userFollow = data.profile.following;
      });
  }
  unfollow() {
    this.profileService
      .unfollowProfile(this.userProfile)
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

  changTab(event) {
    switch (event) {
      case 1:
        this.getArticleByAuthorFavorite();
        break;
      default:
        this.getArticleByAuthor();
        break;
    }
  }
}
