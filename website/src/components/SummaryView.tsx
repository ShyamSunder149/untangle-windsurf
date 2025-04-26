// src/components/SummaryView.tsx
import React from 'react';
import { UserInteraction } from '@/types';

interface SummaryViewProps {
  data: UserInteraction[];
  startDate: Date;
  endDate: Date;
}

const SummaryView: React.FC<SummaryViewProps> = ({ data, startDate, endDate }) => {
  // --- Calculations ---
  const totalInteractions = data.length;
  
  // Calculate unique websites visited
  const uniqueWebsites = new Set(data.map(interaction => interaction.website)).size;

  // Format dates for display
  const formatDate = (date: Date): string => {
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // --- Render Summary ---
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Activity Summary</h3>
      
      {/* Date Range Display */}
      <div className="mb-6 p-3 bg-blue-100 dark:bg-blue-900 rounded-md border border-blue-200 dark:border-blue-700">
        <p className="text-center text-sm font-medium text-blue-800 dark:text-blue-200">
          Displaying data from <span className="font-bold">{formatDate(startDate)}</span> to <span className="font-bold">{formatDate(endDate)}</span>
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Total Interactions</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{totalInteractions}</p>
        </div>
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Unique Websites Visited</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{uniqueWebsites}</p>
        </div>
      </div>
    </div>
  );
};

export default SummaryView;
