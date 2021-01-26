import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleStatistic } from '../article.model';
import { ArticlesService } from '../articles.service';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.css'],
})
export class ArticlesListComponent implements OnInit {
  @Input() dataArticles: ArticleStatistic;
  @Output() emitPaging = new EventEmitter<any>();
  token = localStorage.getItem('token');
  constructor(
    private articleService: ArticlesService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  changePaging(event) {
    this.emitPaging.emit(event);
  }
  changeHeart(slug, favorited) {
    if (!this.token) {
      this.router.navigate(['/', 'login']);
    } else {
      if (favorited) {
        this.articleService.unfavoriteArticle(slug).subscribe(() => {
          this.setFavorite(favorited, slug);
        });
      } else {
        this.articleService.favoriteArticle(slug).subscribe(() => {
          this.setFavorite(favorited, slug);
        });
      }
    }
  }

  setFavorite(value: boolean, slug) {
    if (this.dataArticles) {
      this.dataArticles.articles.map((e) => {
        if (e.slug === slug) {
          e.favorited = !value;
          const count = e.favoritesCount;
          e.favoritesCount = e.favorited ? count + 1 : count - 1;
        }
        return e;
      });
    }
  }
}
