import React from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-4 md:p-8 lg:p-12 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100">
      {/* Header */}
      <Navbar />
      
      {/* Hero Section */}
      <section className="w-full max-w-4xl text-center py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
          Untangle Your Digital Life
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
          Reclaim your focus and time from endless scrolling. Untangle helps you understand
          your habits and build a healthier relationship with technology.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105">
          Add Untangle to Chrome - Start Now!
        </button>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Take control of your browsing</p>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full max-w-5xl py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How Untangle Helps You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-2">Mindful Browsing</h3>
            <p className="text-gray-600 dark:text-gray-300">Become aware of your time on distracting sites and make conscious choices.</p>
          </div>
          {/* Feature 2 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-2">Personalized Insights</h3>
            <p className="text-gray-600 dark:text-gray-300">Understand *why* you browse based on your history, time, and in-app feedback.</p>
          </div>
          {/* Feature 3 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-semibold mb-2">Time Reclaimed</h3>
            <p className="text-gray-600 dark:text-gray-300">Reduce mindless consumption and redirect your energy towards what matters.</p>
          </div>
        </div>
      </section>

      {/* Problem & Solution Stats Section */}
      <section id="problem-solution" className="w-full bg-gray-100 dark:bg-gray-800 py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">The Cost of Digital Distraction</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-center mb-12">
            <div>
              <p className="text-4xl font-bold text-red-600 dark:text-red-400">~70%</p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">Of people admit to 'doom scrolling' regularly, losing valuable time.</p>
            </div>
            <div>
              <p className="text-4xl font-bold text-red-600 dark:text-red-400">2.5+ Hours</p>
              <p className="text-lg text-gray-700 dark:text-gray-300 mt-2">Average daily time spent on social media, often unintentionally.</p>
            </div>
          </div>
          <div className="text-center max-w-3xl mx-auto">
             <h3 className="text-2xl font-semibold mb-4">Untangle Offers a Way Out</h3>
             <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                Untangle empowers you to reduce time on media consumption platforms. We provide personalized insights derived from your browsing patterns, timestamps, and even your responses to why you visited certain sites, helping you build mindful digital habits.
             </p>
             <p className="text-lg font-medium text-blue-600 dark:text-blue-400">
                Gain clarity and control over your online time.
             </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-4xl text-center py-16 md:py-24">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Untangle Your Browsing?</h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8">
          Install the extension now and experience the difference.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 ease-in-out transform hover:scale-105">
          Add Untangle to Chrome
        </button>
      </section>

      {/* Optional Footer Placeholder */}
      {/* <footer className="w-full py-6 mt-12 border-t border-gray-200 dark:border-gray-700 text-center text-gray-500 dark:text-gray-400">
        {new Date().getFullYear()} Productivity Extension. All rights reserved.
      </footer> */}
    </main>
  );
}
