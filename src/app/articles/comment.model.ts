import { Profile } from '../profile/profile.model';

export interface CommentStatistic {
  comments: Comment[];
}

export interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Profile;
}
