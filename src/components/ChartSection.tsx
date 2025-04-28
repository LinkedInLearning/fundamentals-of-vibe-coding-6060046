import React, { useState } from 'react';
import { ParsedPost } from '../types';

interface ChartSectionProps {
  posts: ParsedPost[];
  darkMode: boolean;
}

const ChartSection: React.FC<ChartSectionProps> = ({ posts, darkMode }) => {
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [hoveredEngagementBar, setHoveredEngagementBar] = useState<number | null>(null);
  const [hoveredRatioBar, setHoveredRatioBar] = useState<number | null>(null);

  // Calculate the maximum values for scaling
  const maxImpressions = Math.max(...posts.map(post => post.impressions));
  const maxViews = Math.max(...posts.map(post => post.views));
  const maxEngagement = Math.max(...posts.map(post => post.engagement));

  // Calculate engagement rates and view ratios
  const engagementRates = posts.map(post => (post.engagement / post.impressions) * 100);
  const viewRatios = posts.map(post => (post.views / post.impressions) * 100);
  const maxEngagementRate = Math.max(...engagementRates);
  const maxViewRatio = Math.max(...viewRatios);

  // Sort posts by date
  const sortedPosts = [...posts].sort((a, b) => a.date.getTime() - b.date.getTime());
  
  // Format date for display
  const formatDate = (date: Date) => {
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const formatPercent = (value: number) => {
    return value.toFixed(1) + '%';
  };

  const ChartGrid = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Main Metrics Chart */}
      <div className={`p-6 rounded-xl shadow-sm ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} transition-all duration-300`}>
        <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
        <div className="h-60 mt-6 mb-10 relative">
          {[0, 25, 50, 75, 100].map((percent, i) => (
            <div 
              key={i}
              className={`absolute w-full ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-t`} 
              style={{ bottom: `${percent}%` }}
            >
              <span className={`absolute -left-12 -translate-y-1/2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {percent === 0 ? '0' : `${percent}%`}
              </span>
            </div>
          ))}

          <div className="absolute inset-0 flex items-end justify-between px-8">
            {sortedPosts.map((post, i) => (
              <div 
                key={i} 
                className="relative flex items-end justify-center gap-2"
                style={{ height: '100%', width: `${90 / sortedPosts.length}%` }}
                onMouseEnter={() => setHoveredBar(i)}
                onMouseLeave={() => setHoveredBar(null)}
              >
                <div 
                  className="w-3 bg-blue-500 rounded-t transition-all duration-300 hover:opacity-80"
                  style={{ height: `${(post.impressions / maxImpressions) * 100}%` }}
                />
                <div 
                  className="w-3 bg-green-500 rounded-t transition-all duration-300 hover:opacity-80"
                  style={{ height: `${(post.views / maxViews) * 100}%` }}
                />
                <div 
                  className="w-3 bg-orange-500 rounded-t transition-all duration-300 hover:opacity-80"
                  style={{ height: `${(post.engagement / maxEngagement) * 100}%` }}
                />
                
                {hoveredBar === i && (
                  <div 
                    className={`absolute bottom-full mb-2 p-3 rounded shadow-lg text-sm whitespace-nowrap z-10 ${
                      darkMode ? 'bg-gray-700' : 'bg-white'
                    }`}
                    style={{
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}
                  >
                    <h3 className="font-medium mb-2 text-base">{post.title}</h3>
                    <div className="space-y-1.5">
                      <div className="flex items-center">
                        <span className="text-blue-500 font-medium mr-2">Impressions:</span>
                        <span>{post.impressions.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-green-500 font-medium mr-2">Views:</span>
                        <span>{post.views.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-orange-500 font-medium mr-2">Engagement:</span>
                        <span>{post.engagement.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="absolute -bottom-8 left-0 right-0 flex justify-between px-8">
            {sortedPosts.map((post, i) => (
              <div 
                key={i} 
                className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} transform -rotate-45 origin-top-left translate-y-4`}
              >
                {formatDate(post.date)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Engagement Rate Chart */}
      <div className={`p-6 rounded-xl shadow-sm ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} transition-all duration-300`}>
        <h3 className="text-lg font-semibold mb-4">Engagement Rate Trend</h3>
        <div className="h-60 mt-6 mb-10 relative">
          {[0, 2, 4, 6, 8].map((percent, i) => (
            <div 
              key={i}
              className={`absolute w-full ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-t`} 
              style={{ bottom: `${(percent / 8) * 100}%` }}
            >
              <span className={`absolute -left-12 -translate-y-1/2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {percent}%
              </span>
            </div>
          ))}

          <div className="absolute inset-0 flex items-end justify-between px-8">
            {sortedPosts.map((post, i) => {
              const engagementRate = (post.engagement / post.impressions) * 100;
              return (
                <div 
                  key={i} 
                  className="relative flex items-end justify-center"
                  style={{ height: '100%', width: `${90 / sortedPosts.length}%` }}
                  onMouseEnter={() => setHoveredEngagementBar(i)}
                  onMouseLeave={() => setHoveredEngagementBar(null)}
                >
                  <div 
                    className="w-6 bg-purple-500 rounded-t transition-all duration-300 hover:opacity-80"
                    style={{ height: `${(engagementRate / 8) * 100}%` }}
                  />
                  
                  {hoveredEngagementBar === i && (
                    <div 
                      className={`absolute bottom-full mb-2 p-3 rounded shadow-lg text-sm whitespace-nowrap z-10 ${
                        darkMode ? 'bg-gray-700' : 'bg-white'
                      }`}
                      style={{
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }}
                    >
                      <h3 className="font-medium mb-2 text-base">{post.title}</h3>
                      <div className="flex items-center">
                        <span className="text-purple-500 font-medium mr-2">Engagement Rate:</span>
                        <span>{formatPercent(engagementRate)}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="absolute -bottom-8 left-0 right-0 flex justify-between px-8">
            {sortedPosts.map((post, i) => (
              <div 
                key={i} 
                className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} transform -rotate-45 origin-top-left translate-y-4`}
              >
                {formatDate(post.date)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View-to-Impression Ratio Chart */}
      <div className={`p-6 rounded-xl shadow-sm ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} transition-all duration-300`}>
        <h3 className="text-lg font-semibold mb-4">View-to-Impression Ratio</h3>
        <div className="h-60 mt-6 mb-10 relative">
          {[0, 20, 40, 60, 80, 100].map((percent, i) => (
            <div 
              key={i}
              className={`absolute w-full ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-t`} 
              style={{ bottom: `${percent}%` }}
            >
              <span className={`absolute -left-12 -translate-y-1/2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {percent}%
              </span>
            </div>
          ))}

          <div className="absolute inset-0 flex items-end justify-between px-8">
            {sortedPosts.map((post, i) => {
              const viewRatio = (post.views / post.impressions) * 100;
              return (
                <div 
                  key={i} 
                  className="relative flex items-end justify-center"
                  style={{ height: '100%', width: `${90 / sortedPosts.length}%` }}
                  onMouseEnter={() => setHoveredRatioBar(i)}
                  onMouseLeave={() => setHoveredRatioBar(null)}
                >
                  <div 
                    className="w-6 bg-cyan-500 rounded-t transition-all duration-300 hover:opacity-80"
                    style={{ height: `${viewRatio}%` }}
                  />
                  
                  {hoveredRatioBar === i && (
                    <div 
                      className={`absolute bottom-full mb-2 p-3 rounded shadow-lg text-sm whitespace-nowrap z-10 ${
                        darkMode ? 'bg-gray-700' : 'bg-white'
                      }`}
                      style={{
                        left: '50%',
                        transform: 'translateX(-50%)',
                      }}
                    >
                      <h3 className="font-medium mb-2 text-base">{post.title}</h3>
                      <div className="flex items-center">
                        <span className="text-cyan-500 font-medium mr-2">View Ratio:</span>
                        <span>{formatPercent(viewRatio)}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="absolute -bottom-8 left-0 right-0 flex justify-between px-8">
            {sortedPosts.map((post, i) => (
              <div 
                key={i} 
                className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} transform -rotate-45 origin-top-left translate-y-4`}
              >
                {formatDate(post.date)}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Watch Time Analysis */}
      <div className={`p-6 rounded-xl shadow-sm ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} transition-all duration-300`}>
        <h3 className="text-lg font-semibold mb-4">Watch Time Insights</h3>
        <div className="grid grid-cols-2 gap-6">
          {/* Total Watch Time */}
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Total Watch Time</span>
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            </div>
            <div className="text-2xl font-bold">
              {sortedPosts.reduce((total, post) => {
                const [hours, minutes] = post.watched.split('h ');
                return total + (parseInt(hours) * 60) + parseInt(minutes);
              }, 0).toLocaleString()} minutes
            </div>
          </div>

          {/* Average Watch Time per View */}
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Avg. Watch Time per View</span>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-2xl font-bold">
              {(sortedPosts.reduce((total, post) => {
                const [hours, minutes] = post.watched.split('h ');
                return total + (parseInt(hours) * 60) + parseInt(minutes);
              }, 0) / sortedPosts.reduce((total, post) => total + post.views, 0)).toFixed(2)} minutes
            </div>
          </div>

          {/* Most Watched Video */}
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Most Watched Video</span>
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            </div>
            {(() => {
              const mostWatched = sortedPosts.reduce((max, post) => {
                const [hours, minutes] = post.watched.split('h ');
                const currentMinutes = (parseInt(hours) * 60) + parseInt(minutes);
                const [maxHours, maxMinutes] = max.watched.split('h ');
                const maxTotalMinutes = (parseInt(maxHours) * 60) + parseInt(maxMinutes);
                return currentMinutes > maxTotalMinutes ? post : max;
              }, sortedPosts[0]);

              return (
                <div>
                  <div className="text-sm font-medium mb-1 truncate" title={mostWatched.title}>
                    {mostWatched.title}
                  </div>
                  <div className="text-xl font-bold">{mostWatched.watched}</div>
                </div>
              );
            })()}
          </div>

          {/* Watch Time Trend */}
          <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Watch Time Trend</span>
              <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            </div>
            {(() => {
              const firstHalf = sortedPosts.slice(0, Math.floor(sortedPosts.length / 2));
              const secondHalf = sortedPosts.slice(Math.floor(sortedPosts.length / 2));

              const firstHalfMinutes = firstHalf.reduce((total, post) => {
                const [hours, minutes] = post.watched.split('h ');
                return total + (parseInt(hours) * 60) + parseInt(minutes);
              }, 0);

              const secondHalfMinutes = secondHalf.reduce((total, post) => {
                const [hours, minutes] = post.watched.split('h ');
                return total + (parseInt(hours) * 60) + parseInt(minutes);
              }, 0);

              const percentageChange = ((secondHalfMinutes - firstHalfMinutes) / firstHalfMinutes) * 100;

              return (
                <div className="flex items-center">
                  <span className={`text-2xl font-bold ${percentageChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {percentageChange >= 0 ? '+' : ''}{percentageChange.toFixed(1)}%
                  </span>
                  <span className={`ml-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    vs previous period
                  </span>
                </div>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Performance Trends</h2>
      <ChartGrid />
    </div>
  );
};

export default ChartSection;