import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from './profile.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  username: Profile;

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

  getProfile(username: string) {
    return this.http.get(this.API + '/profiles/' + username, {
      headers: this.getHeader(),
    });
  }

  followProfile(username: string) {
    return this.http.post(
      this.API + `/profiles/${username}/follow`,
      {},
      {
        headers: this.getHeader(),
      }
    );
  }

  unfollowProfile(username: string) {
    return this.http.delete(this.API + `/profiles/${username}/follow`, {
      headers: this.getHeader(),
    });
  }
}
