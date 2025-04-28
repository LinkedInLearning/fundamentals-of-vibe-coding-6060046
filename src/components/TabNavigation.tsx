import React from 'react';
import { BarChart, List } from 'lucide-react';

interface TabNavigationProps {
  activeTab: 'dashboard' | 'posts';
  setActiveTab: (tab: 'dashboard' | 'posts') => void;
  darkMode: boolean;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab, darkMode }) => {
  return (
    <div className="flex space-x-4 mb-6">
      <button
        onClick={() => setActiveTab('dashboard')}
        className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
          activeTab === 'dashboard'
            ? `${darkMode ? 'bg-blue-500 text-white' : 'bg-blue-500 text-white'}`
            : `${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
        }`}
      >
        <BarChart size={20} className="mr-2" />
        Dashboard
      </button>
      <button
        onClick={() => setActiveTab('posts')}
        className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
          activeTab === 'posts'
            ? `${darkMode ? 'bg-blue-500 text-white' : 'bg-blue-500 text-white'}`
            : `${darkMode ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
        }`}
      >
        <List size={20} className="mr-2" />
        All Posts
      </button>
    </div>
  );
};

export default TabNavigation; 