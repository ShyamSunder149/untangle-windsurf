// src/components/ChartView.tsx
'use client'; // Recharts requires client-side rendering

import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { UserInteraction } from '@/types';

interface ChartViewProps {
  data: UserInteraction[];
  startDate: Date;
  endDate: Date;
}

const ChartView: React.FC<ChartViewProps> = ({ data, startDate, endDate }) => {
  // --- Process Data for Chart: Count interactions per website ---
  const dataForChart = data.reduce((acc, interaction) => {
    // Use website as the key
    const key = interaction.website || 'Unknown Website'; 
    const existingEntry = acc.find(entry => entry.name === key);
    
    if (existingEntry) {
      existingEntry.count += 1;
    } else {
      acc.push({ name: key, count: 1 });
    }
    return acc;
  }, [] as { name: string; count: number }[]);

  // Sort data for better visualization (optional)
  dataForChart.sort((a, b) => b.count - a.count); 

  // Limit the number of bars shown for readability (optional)
  const topN = 10; // Show top 10 websites
  const chartData = dataForChart.slice(0, topN);

  // Format dates for display
  const formatDate = (date: Date): string => {
      return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  // --- Render Chart ---
  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg shadow-inner">
       <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Website Interaction Frequency</h3>
      
       {/* Date Range Display */}
       <div className="mb-6 p-3 bg-blue-100 dark:bg-blue-900 rounded-md border border-blue-200 dark:border-blue-700">
         <p className="text-center text-sm font-medium text-blue-800 dark:text-blue-200">
           Displaying data from <span className="font-bold">{formatDate(startDate)}</span> to <span className="font-bold">{formatDate(endDate)}</span>
         </p>
       </div>

      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            {/* Update XAxis to use website name */}
            <XAxis dataKey="name" angle={-15} textAnchor="end" height={60} interval={0} fontSize={10} /> 
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            {/* Update Bar to use 'count' for value */}
            <Bar dataKey="count" fill="#8884d8" name="Interactions" />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-400 py-10">
          No website interaction data to display for this period.
        </p>
      )}
    </div>
  );
};

export default ChartView;
