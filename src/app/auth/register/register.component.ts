import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../../profile/user.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  form: FormGroup;

  emailPattern = '^[a-z][a-z0-9_.]+@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$';
  error: any;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {
    this.form = this.fb.group({
      user: this.fb.group({
        username: ['', [Validators.required]],
        email: [
          '',
          [Validators.required, Validators.pattern(this.emailPattern)],
        ],
        password: ['', [Validators.required, Validators.minLength(8)]],
      }),
    });
  }

  ngOnInit(): void {}

  register() {
    this.authService.registerUser(this.form.value).subscribe(
      (data: { user: User }) => {
        localStorage.setItem('newEmail', data.user.email);
        this.router.navigate(['/login']);
        this.snackBarService.openSnackBar('register', 2, 'success');
      },
      (error) => {
        if (error.error.errors)
          this.error = 'Email or Username have been already existed';
        this.snackBarService.openSnackBar('register', 2, 'error');
      }
    );
  }
}
