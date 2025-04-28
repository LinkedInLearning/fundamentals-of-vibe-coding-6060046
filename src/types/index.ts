export interface Post {
  date: string;
  title: string;
  impressions: string;
  reached: string;
  views: string;
  watched: string;
  reaction: string;
  comment: string;
  repost: string;
  transcript: string;
  post: string;
}

export interface ParsedPost extends Omit<Post, 'impressions' | 'reached' | 'views' | 'reaction' | 'comment' | 'repost'> {
  impressions: number;
  reached: number;
  views: number;
  reaction: number;
  comment: number;
  repost: number;
  date: Date;
  engagement: number;
  conversionRate: number;
}