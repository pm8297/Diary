import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { ArticleStatistic } from '../articles/article.model';
import { ArticlesService } from '../articles/articles.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  global: ArticleStatistic;
  isLogged: boolean;
  authorArt: ArticleStatistic;
  author: string;
  feedArticle: ArticleStatistic;
  listTag: [];
  articleTag: ArticleStatistic;
  nameTag: string;
  isShowTabTag = false;
  activeTab = 0;
  constructor(
    private ac: ActivatedRoute,
    private articlesService: ArticlesService,
    private auth: AuthService
  ) {
    this.auth.getLoggedIn().subscribe((data: boolean) => {
      this.isLogged = data;
    });
  }

  ngOnInit(): void {
    this.getListTag();
    if (this.isLogged) {
      this.getFeedArticle();
    } else {
      this.getGlobalArticle();
    }
  }

  getFeedArticle(limit = '10', offset = '0') {
    this.articlesService
      .getFeedArticle(limit, offset)
      .subscribe((data: ArticleStatistic) => {
        this.feedArticle = data;
      });
  }

  getGlobalArticle(limit = '10', offset = '0') {
    this.articlesService
      .getGlobalArticle(limit, offset)
      .subscribe((data: ArticleStatistic) => {
        this.global = data;
      });
  }

  getListTag() {
    this.articlesService.getListTag().subscribe((res) => {
      this.listTag = res['tags'];
    });
  }

  getArticleByTag(tag, limit = '10', offset = '0') {
    this.articlesService
      .getArticleByTag(tag, limit, offset)
      .subscribe((res: ArticleStatistic) => {
        this.articleTag = res;
      });
  }
  change(item) {
    this.getArticleByTag(item ? item : '');
    this.nameTag = item;
    this.isShowTabTag = true;
    this.activeTab = this.isLogged ? 2 : 1;
  }

  changePaging(event: PageEvent, type: string) {
    const offset = event.pageIndex * event.pageSize;
    switch (type) {
      case 'articleGlobal':
        this.getGlobalArticle(event.pageSize + '', offset + '');
        break;
      case 'articleTags':
        this.getArticleByTag(this.nameTag, event.pageSize + '', offset + '');
        break;
      default:
        this.getFeedArticle(event.pageSize + '', offset + '');
        break;
    }
  }

  changTab(event) {
    if (this.isLogged) {
      switch (event) {
        case 0:
          this.getFeedArticle();
          this.isShowTabTag = false;
          break;
        case 1:
          this.getGlobalArticle();
          this.isShowTabTag = false;
          break;
        default:
          break;
      }
    } else {
      switch (event) {
        case 0:
          this.getGlobalArticle();
          this.isShowTabTag = false;
          break;
        default:
          break;
      }
    }
  }
}
