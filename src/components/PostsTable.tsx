import React, { useState } from 'react';
import { ParsedPost } from '../types';
import { formatDate, formatNumber } from '../utils/parseData';

interface PostsTableProps {
  posts: ParsedPost[];
  darkMode: boolean;
}

const PostsTable: React.FC<PostsTableProps> = ({ posts, darkMode }) => {
  const [sortField, setSortField] = useState<keyof ParsedPost>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  const handleSort = (field: keyof ParsedPost) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedPosts = [...posts].sort((a, b) => {
    if (sortField === 'date') {
      const dateSort = sortDirection === 'asc' 
        ? new Date(a.date).getTime() - new Date(b.date).getTime()
        : new Date(b.date).getTime() - new Date(a.date).getTime();
      return dateSort;
    } else {
      const valueA = a[sortField];
      const valueB = b[sortField];
      
      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return sortDirection === 'asc' ? valueA - valueB : valueB - valueA;
      }
      
      return 0;
    }
  });

  const getSortIcon = (field: keyof ParsedPost) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="overflow-x-auto">
      <table className={`min-w-full ${darkMode ? 'text-gray-100' : 'text-gray-800'}`}>
        <thead>
          <tr className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
            <th onClick={() => handleSort('date')} className="py-2 px-4 text-left cursor-pointer">
              Date {getSortIcon('date')}
            </th>
            <th onClick={() => handleSort('title')} className="py-2 px-4 text-left cursor-pointer">
              Title {getSortIcon('title')}
            </th>
            <th onClick={() => handleSort('impressions')} className="py-2 px-4 text-right cursor-pointer">
              Impressions {getSortIcon('impressions')}
            </th>
            <th onClick={() => handleSort('views')} className="py-2 px-4 text-right cursor-pointer">
              Views {getSortIcon('views')}
            </th>
            <th onClick={() => handleSort('reaction')} className="py-2 px-4 text-right cursor-pointer">
              Reactions {getSortIcon('reaction')}
            </th>
            <th onClick={() => handleSort('comment')} className="py-2 px-4 text-right cursor-pointer">
              Comments {getSortIcon('comment')}
            </th>
            <th onClick={() => handleSort('repost')} className="py-2 px-4 text-right cursor-pointer">
              Reposts {getSortIcon('repost')}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedPosts.map((post, index) => (
            <tr key={index} className={`border-b ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-200 hover:bg-gray-50'} transition-colors`}>
              <td className="py-3 px-4">{formatDate(post.date)}</td>
              <td className="py-3 px-4 font-medium">{post.title}</td>
              <td className="py-3 px-4 text-right">{formatNumber(post.impressions)}</td>
              <td className="py-3 px-4 text-right">{formatNumber(post.views)}</td>
              <td className="py-3 px-4 text-right">{post.reaction}</td>
              <td className="py-3 px-4 text-right">{post.comment}</td>
              <td className="py-3 px-4 text-right">{post.repost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostsTable;