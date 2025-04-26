// src/app/profile/page.tsx
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabaseClient';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReportView from '@/components/ReportView';
import ChartView from '@/components/ChartView';
import SummaryView from '@/components/SummaryView';
import Navbar from '@/components/Navbar';
import { UserInteraction } from '@/types';

// Helper to set time to start/end of day for accurate filtering
const getStartOfDay = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
};

const getEndOfDay = (date: Date): Date => {
  const newDate = new Date(date);
  newDate.setHours(23, 59, 59, 999);
  return newDate;
};

type ViewType = 'report' | 'chart' | 'summary';

// Dummy Profile Data
const dummyProfile = {
  username: 'DigitalDetoxer',
  email: 'user@example.com',
  country: 'United States',
};

export default function ProfilePage() {
  const [view, setView] = useState<ViewType>('summary'); // Default view
  const [allData, setAllData] = useState<UserInteraction[]>([]); // Store all fetched data
  const [filteredData, setFilteredData] = useState<UserInteraction[]>([]); // Data for the selected range
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // --- Date Range State ---
  const [startDate, setStartDate] = useState<Date>(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7); // Default to 7 days ago
    return getStartOfDay(date);
  });
  const [endDate, setEndDate] = useState<Date>(() => getEndOfDay(new Date())); // Default to today

  // --- Fetch All Data Once ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Fetch a broader range initially, or perhaps fetch all if feasible?
        // For now, let's fetch last 30 days to allow some selection flexibility
        // WARNING: Fetching ALL data might be slow/expensive for large datasets.
        // Consider server-side filtering or pagination if performance becomes an issue.
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const { data: interactions, error: fetchError } = await supabase
          .from('user_interactions')
          .select('*')
          .gte('created_at', thirtyDaysAgo.toISOString()) // Fetch data >= 30 days ago
          .order('created_at', { ascending: false });
        // .limit(1000); // Adjust limit as needed

        if (fetchError) {
          throw fetchError;
        }

        setAllData(interactions || []);
      } catch (err: any) {
        console.error('Error fetching data:', err);
        setError(`Failed to load interaction data: ${err.message}`);
        setAllData([]); // Ensure data is cleared on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Filter Data Based on Date Range ---
  useEffect(() => {
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();

    const filtered = allData.filter(interaction => {
      const interactionTimestamp = new Date(interaction.created_at).getTime();
      return interactionTimestamp >= startTimestamp && interactionTimestamp <= endTimestamp;
    });
    setFilteredData(filtered);
  }, [startDate, endDate, allData]);

  // Function to render the selected view component
  const renderView = () => {
    if (loading && allData.length === 0) return <p className="text-center text-gray-500 dark:text-gray-400">Loading initial data...</p>;
    if (error) return <p className="text-center text-red-600 dark:text-red-400">{error}</p>;
    if (!filteredData || filteredData.length === 0) return <p className="text-center text-gray-500 dark:text-gray-400">No interaction data available for the selected date range.</p>;

    // Pass filtered data and date range to components
    const viewProps = {
      data: filteredData,
      startDate,
      endDate
    };

    switch (view) {
      case 'report':
        return <ReportView {...viewProps} />;
      case 'chart':
        // ChartView might need specific adjustments depending on what you want to chart now
        return <ChartView {...viewProps} />;
      case 'summary':
      default:
        return <SummaryView {...viewProps} />;
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100">
      <Navbar />
      <div className="mb-6 p-4 bg-blue-100 border border-blue-200 text-blue-800 rounded-md text-sm dark:bg-blue-900 dark:border-blue-700 dark:text-blue-200">
        <p>
          <span className="font-semibold">Note:</span> This page currently displays all recorded activity from the connected browser extension. This setup is part of the initial MVP demonstration.
        </p>
      </div>
      <div className="w-full max-w-6xl">
        {/* Profile Information Section - Redesigned */}
        <section className="mb-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
          {/* Avatar Placeholder */}
          <div className="flex-shrink-0 w-24 h-24 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold shadow-md">
            {dummyProfile.username.charAt(0).toUpperCase()}
          </div>
          {/* Profile Details */}
          <div className="flex-grow text-center md:text-left">
            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-gray-100">{dummyProfile.username}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-1">{dummyProfile.email}</p>
            <p className="text-md text-gray-500 dark:text-gray-500">{dummyProfile.country}</p>
            <a href="/history-scraper/dashboard.html" className="mt-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline block">View History Dashboard</a>
          </div>
          {/* Optional: Add an Edit Profile button or link here */}
          {/* <button className="mt-4 md:mt-0 md:ml-auto px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">Edit Profile</button> */}
        </section>

        {/* Statistics Section */}
        <section className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-gray-100">Your Interaction Stats</h2>

          {/* --- Date Range Selector --- */}
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-md">
            <div className="flex items-center space-x-2">
              <label htmlFor="startDate" className="text-sm font-medium text-gray-700 dark:text-gray-300">From:</label>
              <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => {
                  if (date) {
                    setStartDate(getStartOfDay(date))
                  }
                }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                dateFormat="MMM d, yyyy"
                className="p-2 border border-gray-300 rounded-md text-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                id="startDate"
              />
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="endDate" className="text-sm font-medium text-gray-700 dark:text-gray-300">To:</label>
              <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => {
                  if (date) {
                    setEndDate(getEndOfDay(date))
                  }
                }}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate} // Prevent end date being before start date
                dateFormat="MMM d, yyyy"
                className="p-2 border border-gray-300 rounded-md text-sm dark:bg-gray-600 dark:border-gray-500 dark:text-white"
                id="endDate"
              />
            </div>
            <button
              onClick={() => {
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                setStartDate(getStartOfDay(yesterday));
                setEndDate(getEndOfDay(yesterday));
              }}
              className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Yesterday
            </button>
            <button
              onClick={() => {
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                setStartDate(getStartOfDay(sevenDaysAgo));
                setEndDate(getEndOfDay(new Date()));
              }}
              className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Last 7 Days
            </button>
          </div>

          {/* View Selection Buttons */}
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setView('summary')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${view === 'summary' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
            >
              Summary
            </button>
            <button
              onClick={() => setView('report')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${view === 'report' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
            >
              Report
            </button>
            <button
              onClick={() => setView('chart')}
              className={`px-4 py-2 rounded-md font-medium transition-colors ${view === 'chart' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'}`}
            >
              Chart
            </button>
          </div>

          {/* Render Selected View */}
          <div className="mt-4">
            {renderView()}
          </div>
        </section>
      </div>
    </main>
  );
}
