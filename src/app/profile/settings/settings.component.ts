import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/profile/user.model';
import { SnackBarService } from 'src/app/shared/snack-bar.service';
import { UserService } from '../user.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  form: FormGroup;
  emailPattern = '^[a-z][a-z0-9_.]+@[a-z0-9]{2,}(.[a-z0-9]{2,4}){1,2}$';
  errEmail: string;
  errUsername: string;
  submit: boolean;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private snackBarService: SnackBarService
  ) {
    this.userService.getCurrentUser().subscribe((u: { user: User }) => {
      this.form = this.fb.group({
        user: this.fb.group({
          email: [
            u.user.email,
            [Validators.required, Validators.pattern(this.emailPattern)],
          ],
          password: ['', [Validators.required, Validators.minLength(8)]],
          username: [u.user.username, [Validators.required]],
          bio: [u.user.bio],
          image: [u.user.image],
        }),
      });
    });
  }
  ngOnInit() {}
  onSubmit() {
    this.submit = true;
    this.userService.updateUser(this.form.value).subscribe(
      (data: { user: User }) => {
        this.userService.setNewUsername(data.user.username);
        this.userService.setNewImage(data.user.image);
        this.router.navigate(['/', 'profile', data.user.username]);
        this.snackBarService.openSnackBar('Edit', 3, 'success');
      },
      (error) => {
        this.errEmail = error.error.errors.email;
        this.errUsername = error.error.errors.username;
        this.snackBarService.openSnackBar('Edit', 3, 'error');
      }
    );
  }
}
