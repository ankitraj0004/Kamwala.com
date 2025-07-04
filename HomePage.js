import React from 'react';
import { PlusCircle, Search, Users, CheckCircle, TrendingUp, MapPin } from 'lucide-react';
import { mockTasks } from '../data/mockData';
import TaskCard from './TaskCard';

interface HomePageProps {
  onPageChange: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPageChange }) => {
  const recentTasks = mockTasks.filter(task => task.status === 'open').slice(0, 3);
  const completedTasks = mockTasks.filter(task => task.status === 'completed').length;
  const activeTasks = mockTasks.filter(task => task.status === 'in_progress').length;
  const totalTasks = mockTasks.length;

  const stats = [
    { label: 'Total Tasks', value: totalTasks, icon: TrendingUp, color: 'bg-blue-500' },
    { label: 'Active Tasks', value: activeTasks, icon: Users, color: 'bg-yellow-500' },
    { label: 'Completed', value: completedTasks, icon: CheckCircle, color: 'bg-green-500' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Connect. Work. Thrive.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-purple-100">
              Find local tasks or offer your services in Springfield Village
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => onPageChange('browse')}
                className="flex items-center justify-center px-8 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
              >
                <Search className="w-5 h-5 mr-2" />
                Browse Tasks
              </button>
              <button
                onClick={() => onPageChange('post')}
                className="flex items-center justify-center px-8 py-3 bg-purple-700 text-white rounded-lg font-semibold hover:bg-purple-800 transition-colors"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Post a Task
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center">
                  <div className={`${stat.color} rounded-lg p-3 mr-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Recent Tasks */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Tasks</h2>
            <button
              onClick={() => onPageChange('browse')}
              className="text-purple-600 hover:text-purple-700 font-medium"
            >
              View all →
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onApply={(taskId) => {
                  // Handle apply logic here
                  console.log('Applied to task:', taskId);
                }}
                onViewDetails={(taskId) => {
                  // Handle view details logic here
                  console.log('View details for task:', taskId);
                }}
              />
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <PlusCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Post a Task</h3>
              <p className="text-gray-600">
                Describe what you need done and set your budget. It's free to post!
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get Applications</h3>
              <p className="text-gray-600">
                Local community members will apply to help you complete your task.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Get It Done</h3>
              <p className="text-gray-600">
                Choose the best applicant and get your task completed safely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
