// src/components/ReportView.tsx
import React from 'react';
import { UserInteraction } from '@/types';

interface ReportViewProps {
  data: UserInteraction[];
  startDate: Date;
  endDate: Date;
}

const ReportView: React.FC<ReportViewProps> = ({ data, startDate, endDate }) => {
  return (
    <div className="overflow-x-auto shadow-md sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Timestamp (Created At)
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Website
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Website Path
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              Details
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((interaction) => (
            <tr key={interaction.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {new Date(interaction.created_at).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {interaction.website}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                {/* Display path, default to '/' if empty/null */}
                {interaction.path || '/'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                {interaction.details || 'N/A'}
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                No data available for this period.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReportView;
