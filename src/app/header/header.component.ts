import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../profile/user.service';
import { SnackBarService } from '../shared/snack-bar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLogged: boolean;
  username: string;
  image: any;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private snackBarService: SnackBarService
  ) {
    this.authService.getLoggedIn().subscribe((bool) => {
      this.isLogged = bool;
    });
    this.authService.usernameObservable$.subscribe((username) => {
      this.username = username;
    });
    this.authService.getImage().subscribe((image) => {
      this.image = image;
    });
  }

  ngOnInit(): void {
    this.loggedInUser();
    this.loggedInImage();
    this.updateUser();
  }

  logout() {
    this.authService.destroyToken();
    this.snackBarService.openSnackBar('logout', 2, 'success');
  }

  loggedInUser() {
    if (localStorage.getItem('username')) {
      this.authService.setUsername(localStorage.getItem('username'));
      this.authService.usernameObservable$.subscribe((username: string) => {
        this.username = username;
      });
    }
  }

  loggedInImage() {
    if (localStorage.getItem('image') == 'null') {
      this.authService.setImage(
        'https://cdn1.vectorstock.com/i/thumb-large/22/05/male-profile-picture-vector-1862205.jpg'
      );
      this.authService.getImage().subscribe((image: string) => {
        this.image = image;
      });
    } else {
      this.authService.setImage(localStorage.getItem('image'));
      this.authService.getImage().subscribe((image: string) => {
        this.image = image;
      });
    }
  }

  updateUser() {
    this.userService.usernameObs$.subscribe((newName: string) => {
      this.username = newName;
    });
    this.userService.imageObs$.subscribe((newImage: string) => {
      this.image = newImage;
    });
  }
}
