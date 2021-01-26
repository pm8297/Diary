import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { UserStatistic } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  API = 'https://conduit.productionready.io/api/user';

  username = new Subject<string>();
  usernameObs$ = this.username.asObservable();
  image = new Subject<string>();
  imageObs$ = this.image.asObservable();

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
  getCurrentUser() {
    return this.http.get(this.API, {
      headers: this.getHeader()
    });
  }

  updateUser(body: UserStatistic) {
    return this.http.put(this.API, body, {
      headers: this.getHeader()
    });
  }

  setNewUsername(newName: string) {
    localStorage.setItem('username', newName);
    this.username.next(newName);
  }

  setNewImage(newImage: string) {
    localStorage.setItem('image', newImage);
    this.image.next(newImage);
  }
}
