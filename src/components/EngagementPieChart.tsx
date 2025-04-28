import React, { useMemo } from 'react';
import { ParsedPost } from '../types';

interface EngagementPieChartProps {
  posts: ParsedPost[];
  darkMode: boolean;
}

const EngagementPieChart: React.FC<EngagementPieChartProps> = ({ posts, darkMode }) => {
  const engagementData = useMemo(() => {
    const totalReactions = posts.reduce((sum, post) => sum + post.reaction, 0);
    const totalComments = posts.reduce((sum, post) => sum + post.comment, 0);
    const totalReposts = posts.reduce((sum, post) => sum + post.repost, 0);
    const total = totalReactions + totalComments + totalReposts;
    
    return {
      reactions: {
        value: totalReactions,
        percentage: Math.round((totalReactions / total) * 100),
        color: '#F97316' // orange
      },
      comments: {
        value: totalComments,
        percentage: Math.round((totalComments / total) * 100),
        color: '#10B981' // green
      },
      reposts: {
        value: totalReposts,
        percentage: Math.round((totalReposts / total) * 100),
        color: '#3B82F6' // blue
      }
    };
  }, [posts]);

  // Create SVG paths for pie chart
  const createPiePath = (startAngle: number, endAngle: number) => {
    const centerX = 60;
    const centerY = 60;
    const radius = 50;
    
    const startX = centerX + radius * Math.cos(startAngle);
    const startY = centerY + radius * Math.sin(startAngle);
    const endX = centerX + radius * Math.cos(endAngle);
    const endY = centerY + radius * Math.sin(endAngle);
    
    // Arc flag is 1 if angle > 180 degrees
    const largeArcFlag = endAngle - startAngle > Math.PI ? 1 : 0;
    
    return `M ${centerX} ${centerY} L ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY} Z`;
  };

  // Calculate angles for pie slices
  const reactionsAngle = (engagementData.reactions.percentage / 100) * 2 * Math.PI;
  const commentsAngle = (engagementData.comments.percentage / 100) * 2 * Math.PI;
  
  // Start angles for each slice
  const reactionsStartAngle = -Math.PI / 2; // Start at top
  const commentsStartAngle = reactionsStartAngle + reactionsAngle;
  const repostsStartAngle = commentsStartAngle + commentsAngle;
  
  // End angles for each slice
  const reactionsEndAngle = commentsStartAngle;
  const commentsEndAngle = repostsStartAngle;
  const repostsEndAngle = reactionsStartAngle + 2 * Math.PI;

  return (
    <div className={`p-6 rounded-xl shadow-sm ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} transition-all duration-300`}>
      <h2 className="text-xl font-bold mb-4">Engagement Breakdown</h2>
      
      <div className="flex flex-col md:flex-row items-center justify-around">
        <div className="relative w-32 h-32">
          <svg width="120" height="120" viewBox="0 0 120 120">
            <path d={createPiePath(reactionsStartAngle, reactionsEndAngle)} fill={engagementData.reactions.color} />
            <path d={createPiePath(commentsStartAngle, commentsEndAngle)} fill={engagementData.comments.color} />
            <path d={createPiePath(repostsStartAngle, repostsEndAngle)} fill={engagementData.reposts.color} />
          </svg>
        </div>
        
        <div className="space-y-4 mt-6 md:mt-0">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: engagementData.reactions.color }}></div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Reactions</p>
              <p className="text-xl font-bold">{engagementData.reactions.percentage}%</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: engagementData.comments.color }}></div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Comments</p>
              <p className="text-xl font-bold">{engagementData.comments.percentage}%</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: engagementData.reposts.color }}></div>
            <div>
              <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Reposts</p>
              <p className="text-xl font-bold">{engagementData.reposts.percentage}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EngagementPieChart;