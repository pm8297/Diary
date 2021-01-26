export interface UserStatistic {
  user: User;
}

export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image?: any;
}
