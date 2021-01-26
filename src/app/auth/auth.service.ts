import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'https://conduit.productionready.io/api';
  constructor(private http: HttpClient, private router: Router) {
    this.setLoggedIn(!!localStorage.getItem('token'));
  }

  bool$ = new BehaviorSubject<boolean>(true);
  username = new Subject<string>();
  usernameObservable$ = this.username.asObservable();
  image$ = new Subject<string>();

  getImage() {
    return this.image$;
  }
  setImage(image: string) {
    localStorage.setItem('image', image);
    this.image$.next(image);
  }
  setUsername(username: string) {
    localStorage.setItem('username', username);
    this.username.next(username);
  }

  getLoggedIn() {
    return this.bool$;
  }

  setLoggedIn(bool: boolean) {
    this.bool$.next(bool);
  }

  loginUser(user) {
    return this.http.post(this.URL + '/users/login', user);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  registerUser(user) {
    return this.http.post(this.URL + '/users', user);
  }

  storeToken(token) {
    localStorage.setItem('token', token);
    this.router.navigate(['/']);
    this.setLoggedIn(!!localStorage.getItem('token'));
  }
  destroyToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('image');
    localStorage.removeItem('newEmail');
    this.router.navigate(['/']);
    this.setLoggedIn(!!localStorage.getItem('token'));
  }
}
