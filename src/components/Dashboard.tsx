import React, { useState, useEffect } from 'react';
import { ParsedPost } from '../types';
import { parseData, calculateTotals } from '../utils/parseData';
import { postsData } from '../data/posts';
import Header from './Header';
import OverviewCard from './OverviewCard';
import PostsTable from './PostsTable';
import ChartSection from './ChartSection';
import TopPostsCard from './TopPostsCard';
import EngagementPieChart from './EngagementPieChart';
import { BarChart, TrendingUp, Users, Eye } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import TabNavigation from './TabNavigation';

const Dashboard: React.FC = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'posts'>('dashboard');
  const [parsedPosts, setParsedPosts] = useState<ParsedPost[]>([]);
  const [totals, setTotals] = useState({
    totalImpressions: 0,
    totalReached: 0,
    totalViews: 0,
    totalReactions: 0,
    totalComments: 0,
    totalReposts: 0,
    totalEngagement: 0,
  });

  useEffect(() => {
    const posts = parseData(postsData);
    setParsedPosts(posts);
    setTotals(calculateTotals(posts));
  }, []);

  const DashboardView = () => (
    <>
      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        <OverviewCard 
          title="Total Impressions" 
          value={totals.totalImpressions} 
          icon={<BarChart size={20} className={darkMode ? 'text-blue-400' : 'text-blue-500'} />}
          increase={12}
          darkMode={darkMode}
        />
        <OverviewCard 
          title="Total Views" 
          value={totals.totalViews} 
          icon={<Eye size={20} className={darkMode ? 'text-blue-400' : 'text-blue-500'} />}
          increase={8}
          darkMode={darkMode}
        />
        <OverviewCard 
          title="Reach" 
          value={totals.totalReached} 
          icon={<Users size={20} className={darkMode ? 'text-blue-400' : 'text-blue-500'} />}
          increase={5}
          darkMode={darkMode}
        />
        <OverviewCard 
          title="Total Engagement" 
          value={totals.totalEngagement} 
          icon={<TrendingUp size={20} className={darkMode ? 'text-blue-400' : 'text-blue-500'} />}
          increase={15}
          darkMode={darkMode}
        />
      </div>
      
      {/* Charts Section */}
      <div className="mb-8">
        <ChartSection posts={parsedPosts} darkMode={darkMode} />
      </div>
      
      {/* Top Posts & Engagement */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <TopPostsCard 
          posts={parsedPosts} 
          metric="impressions" 
          title="Top Posts by Impressions" 
          darkMode={darkMode}
        />
        <TopPostsCard 
          posts={parsedPosts} 
          metric="views" 
          title="Top Posts by Views" 
          darkMode={darkMode}
        />
        <EngagementPieChart 
          posts={parsedPosts}
          darkMode={darkMode}
        />
      </div>
    </>
  );

  const PostsView = () => (
    <div className={`p-6 rounded-xl shadow-sm ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-all duration-300`}>
      <h2 className="text-xl font-bold mb-4">All Posts</h2>
      <PostsTable posts={parsedPosts} darkMode={darkMode} />
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-1">Social Media Analytics</h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            View performance metrics and trends across your social media content
          </p>
        </div>

        <TabNavigation 
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          darkMode={darkMode}
        />
        
        {activeTab === 'dashboard' ? <DashboardView /> : <PostsView />}
      </main>
      
      <footer className={`py-6 px-4 ${darkMode ? 'bg-gray-900 text-gray-400 border-t border-gray-800' : 'bg-gray-50 text-gray-500 border-t border-gray-200'}`}>
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} SocialMetrics Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;