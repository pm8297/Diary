import { Profile } from '../profile/profile.model';

export interface ArticleStatistic {
  articles: Article[];
  articlesCount: number;
}

export interface Article {
  title: string;
  slug: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  description: string;
  author: Profile;
  favorited: boolean;
  favoritesCount: number;
}
