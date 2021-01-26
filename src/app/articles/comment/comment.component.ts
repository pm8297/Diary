import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserStatistic } from 'src/app/profile/user.model';
import { UserService } from 'src/app/profile/user.service';
import { Comment } from '../comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  token: string = localStorage.getItem('token');
  userCurrent: string;
  canEdit: boolean;
  @Output() deleteComment = new EventEmitter<number>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    if (this.token) {
      this.userService.getCurrentUser().subscribe((data: UserStatistic) => {
        this.userCurrent = data.user.username;
        this.canEdit = this.userCurrent === this.comment.author.username;
      });
    } else {
      this.canEdit = false;
    }
  }
}
