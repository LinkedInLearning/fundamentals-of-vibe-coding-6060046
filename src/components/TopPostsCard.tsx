import React from 'react';
import { ParsedPost } from '../types';
import { formatNumber } from '../utils/parseData';

interface TopPostsCardProps {
  posts: ParsedPost[];
  metric: 'impressions' | 'views' | 'engagement';
  title: string;
  darkMode: boolean;
}

const TopPostsCard: React.FC<TopPostsCardProps> = ({ posts, metric, title, darkMode }) => {
  // Sort posts by the selected metric and get top 5
  const topPosts = [...posts]
    .sort((a, b) => b[metric] - a[metric])
    .slice(0, 5);

  // Find the max value for relative bar sizing
  const maxValue = Math.max(...topPosts.map(post => post[metric]));

  return (
    <div className={`p-6 rounded-xl shadow-sm ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} transition-all duration-300`}>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="space-y-4">
        {topPosts.map((post, index) => (
          <div key={index} className="relative">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium truncate w-4/5">{post.title}</span>
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                {formatNumber(post[metric])}
              </span>
            </div>
            <div className={`h-2 w-full bg-opacity-20 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
              <div 
                className={`h-full rounded ${metric === 'impressions' ? 'bg-blue-500' : metric === 'views' ? 'bg-green-500' : 'bg-orange-500'}`}
                style={{ width: `${(post[metric] / maxValue) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopPostsCard;