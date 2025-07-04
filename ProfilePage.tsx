import React from 'react';
import { Star, Calendar, MapPin, Mail, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockTasks } from '../data/mockData';
import TaskCard from './TaskCard';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  const myTasks = mockTasks.filter(task => task.postedBy === user.name);
  const appliedTasks = mockTasks.filter(task => task.applicants.includes(user.id));

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
              <span className="text-3xl font-bold text-white">
                {user.name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{user.name}</h1>
              <div className="flex items-center justify-center md:justify-start space-x-4 mb-4">
                <div className="flex items-center">
                  {renderStars(user.rating)}
                  <span className="ml-2 text-sm text-gray-600">({user.rating})</span>
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4 mr-1 text-green-500" />
                  {user.completedTasks} completed
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-center md:justify-start text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {user.email}
                </div>
                <div className="flex items-center justify-center md:justify-start text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {user.location}
                </div>
                <div className="flex items-center justify-center md:justify-start text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Member since {new Date(user.joinedDate).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Posted Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{myTasks.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Applied Tasks</p>
                <p className="text-2xl font-bold text-gray-900">{appliedTasks.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rating</p>
                <p className="text-2xl font-bold text-gray-900">{user.rating}/5</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* My Posted Tasks */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">My Posted Tasks</h2>
          {myTasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  showApplyButton={false}
                  onViewDetails={(taskId) => {
                    console.log('View details for task:', taskId);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks posted yet</h3>
              <p className="text-gray-600">Start by posting your first task to get help from the community.</p>
            </div>
          )}
        </div>

        {/* Applied Tasks */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Tasks I've Applied For</h2>
          {appliedTasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {appliedTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  showApplyButton={false}
                  onViewDetails={(taskId) => {
                    console.log('View details for task:', taskId);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No applications yet</h3>
              <p className="text-gray-600">Browse available tasks and apply to help others in your community.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;