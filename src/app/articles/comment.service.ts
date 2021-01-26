import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}
  API = 'https://conduit.productionready.io/api';

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

  getAllComments(slug: string) {
    return this.http.get(this.API + `/articles/${slug}/comments`,{
      headers: this.getHeader()
    });
  }

  addComment(slug: string, body) {
    return this.http.post(this.API + `/articles/${slug}/comments`, body, {
      headers: this.getHeader(),
    });
  }
  deleteComment(id: number, slug: string) {
    return this.http.delete(this.API + `/articles/${slug}/comments/${id}`, {
      headers: this.getHeader(),
    });
  }
}
