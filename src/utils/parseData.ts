import { Post, ParsedPost } from '../types';

export const parseData = (data: Post[]): ParsedPost[] => {
  return data.map(post => {
    // Parse numbers from strings like "1,258,064"
    const impressions = parseInt(post.impressions.replace(/,/g, ''), 10);
    const reached = parseInt(post.reached.replace(/,/g, ''), 10);
    const views = parseInt(post.views.replace(/,/g, ''), 10);
    const reaction = parseInt(post.reaction, 10);
    const comment = parseInt(post.comment, 10);
    const repost = parseInt(post.repost, 10);
    
    // Parse date from string like "2/11/25"
    const [month, day, year] = post.date.split('/').map(Number);
    const date = new Date(2000 + year, month - 1, day);
    
    // Calculate engagement and conversion rate
    const engagement = reaction + comment + repost;
    const conversionRate = views > 0 ? (views / impressions) * 100 : 0;
    
    return {
      ...post,
      impressions,
      reached,
      views,
      reaction,
      comment,
      repost,
      date,
      engagement,
      conversionRate
    };
  }).sort((a, b) => a.date.getTime() - b.date.getTime());
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const calculateTotals = (posts: ParsedPost[]) => {
  return posts.reduce((acc, post) => {
    acc.totalImpressions += post.impressions;
    acc.totalReached += post.reached;
    acc.totalViews += post.views;
    acc.totalReactions += post.reaction;
    acc.totalComments += post.comment;
    acc.totalReposts += post.repost;
    acc.totalEngagement += post.engagement;
    
    return acc;
  }, {
    totalImpressions: 0,
    totalReached: 0,
    totalViews: 0,
    totalReactions: 0,
    totalComments: 0,
    totalReposts: 0,
    totalEngagement: 0,
  });
};

export const calculateAverages = (posts: ParsedPost[]) => {
  const count = posts.length;
  const totals = calculateTotals(posts);
  
  return {
    avgImpressions: totals.totalImpressions / count,
    avgReached: totals.totalReached / count,
    avgViews: totals.totalViews / count,
    avgReactions: totals.totalReactions / count,
    avgComments: totals.totalComments / count,
    avgReposts: totals.totalReposts / count,
    avgEngagement: totals.totalEngagement / count,
    avgConversionRate: (totals.totalViews / totals.totalImpressions) * 100,
  };
};