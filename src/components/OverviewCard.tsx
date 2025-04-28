import React from 'react';
import { formatNumber } from '../utils/parseData';

interface OverviewCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  increase?: number;
  darkMode: boolean;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ 
  title, 
  value, 
  icon, 
  increase = 0,
  darkMode
}) => {
  return (
    <div className={`p-6 rounded-xl shadow-sm ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} transition-all duration-300 hover:shadow-md`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-500'}`}>{title}</h3>
        <div className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-blue-50'}`}>
          {icon}
        </div>
      </div>
      <p className="text-3xl font-bold">{formatNumber(value)}</p>
      {increase !== 0 && (
        <p className={`mt-2 text-sm ${increase > 0 ? 'text-green-500' : 'text-red-500'}`}>
          {increase > 0 ? '+' : ''}{increase}% from last period
        </p>
      )}
    </div>
  );
};

export default OverviewCard;