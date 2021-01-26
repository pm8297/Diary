import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from './article.model';



@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  API = 'https://conduit.productionready.io/api';
  constructor(private http: HttpClient) {}

  getHeader() {
    const tokenLogin = localStorage.getItem('token');
    const header: any = {
      'Content-Type': 'application/json',
    };
    if (tokenLogin) {
      header['Authorization'] = `Token ${tokenLogin}`;
    } else {
      delete header['Authorization'];
    }
    return header;
  }

  getGlobalArticle(limit: string = '10', offset) {
    return this.http.get(this.API + '/articles', {
      headers: this.getHeader(),
      params: {
        limit: limit,
        offset: offset,
      },
    });
  }
  getArticleByAuthor(
    author: string,
    limit: string = '10',
    offset: string = '0'
  ) {
    return this.http.get(this.API + '/articles', {
      headers: this.getHeader(),
      params: {
        author: author,
        limit: limit,
        offset: offset,
      },
    });
  }

  getArticleByAuthorFavorite(
    author: string,
    limit: string = '10',
    offset: string = '0'
  ) {
    return this.http.get(this.API + '/articles', {
      headers: this.getHeader(),
      params: {
        favorited: author,
        limit: limit,
        offset: offset,
      },
    });
  }

  getDetailArticle(slug: string) {
    return this.http.get(this.API + `/articles/${slug}`, {
      headers: this.getHeader(),
    });
  }

  getFeedArticle(limit: string = '10', offset: string = '0') {
    return this.http.get(this.API + '/articles/feed', {
      headers: this.getHeader(),
      params: {
        limit: limit,
        offset: offset,
      },
    });
  }

  addArticle(body: Article) {
    return this.http.post(this.API + '/articles', body, {
      headers: this.getHeader(),
    });
  }

  updateArticle(slug: string, body: Article) {
    return this.http.put(this.API + `/articles/${slug}`, body, {
      headers: this.getHeader(),
    });
  }

  getArticleByTag(tag: string, limit: string = '10', offset: string = '0') {
    return this.http.get(this.API + '/articles', {
      headers: this.getHeader(),
      params: {
        tag: tag,
        limit: limit,
        offset: offset,
      },
    });
  }

  getListTag() {
    return this.http.get(this.API + '/tags', {
      headers: this.getHeader(),
    });
  }

  favoriteArticle(slug: string) {
    return this.http.post(
      this.API + `/articles/${slug}/favorite`,
      {},
      {
        headers: this.getHeader(),
      }
    );
  }

  unfavoriteArticle(slug: string) {
    return this.http.delete(this.API + `/articles/${slug}/favorite`, {
      headers: this.getHeader(),
    });
  }

  deleteArticle(slug: string) {
    return this.http.delete(this.API + `/articles/${slug}`, {
      headers: this.getHeader(),
    });
  }
 

}
