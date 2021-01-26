import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { UserStatistic } from '../../profile/user.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  form: FormGroup;
  emailPattern = '^[a-z][a-z0-9_.]+@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$';
  error: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBarService: SnackBarService
  ) {
    if (localStorage.getItem('newEmail')) {
      this.form = this.fb.group({
        user: this.fb.group({
          email: [
            localStorage.getItem('newEmail'),
            [Validators.required, Validators.pattern(this.emailPattern)],
          ],
          password: ['', [Validators.required, Validators.minLength(8)]],
        }),
      });
    } else {
      this.form = this.fb.group({
        user: this.fb.group({
          email: [
            '',
            [Validators.required, Validators.pattern(this.emailPattern)],
          ],
          password: ['', [Validators.required, Validators.minLength(8)]],
        }),
      });
    }
  }

  ngOnInit(): void {}

  login() {
    this.authService.loginUser(this.form.value).subscribe(
      (data: UserStatistic) => {
        this.authService.storeToken(data['user'].token);
        this.authService.setUsername(data['user'].username);
        this.authService.setImage(data['user'].image);
        this.snackBarService.openSnackBar('login', 4, 'success');
      },
      (error) => {
        this.error = error.error.errors['email or password'][0];
        this.snackBarService.openSnackBar('login', 2, 'error');
      }
    );
  }
}
