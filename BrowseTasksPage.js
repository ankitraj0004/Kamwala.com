import React, { useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import { mockTasks, categories } from '../data/mockData';
import TaskCard from './TaskCard';
import TaskDetailsModal from './TaskDetailsModal';
import MessagingModal from './MessagingModal';

const BrowseTasksPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [showTaskDetails, setShowTaskDetails] = useState(false);
  const [showMessaging, setShowMessaging] = useState(false);
  const [messagingData, setMessagingData] = useState<{
    taskId: string;
    otherUserId: string;
    otherUserName: string;
  } | null>(null);

  const filteredTasks = mockTasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All Categories' || task.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || task.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleApply = (taskId: string, message: string, proposedPrice: number) => {
    console.log('Applied to task:', taskId, 'Message:', message, 'Price:', proposedPrice);
    alert('Application submitted! The task poster will contact you soon.');
  };

  const handleViewDetails = (taskId: string) => {
    const task = mockTasks.find(t => t.id === taskId);
    if (task) {
      setSelectedTask(task);
      setShowTaskDetails(true);
    }
  };

  const handleAcceptApplication = (applicationId: string) => {
    console.log('Accepted application:', applicationId);
    alert('Application accepted! You can now communicate directly with the worker.');
  };

  const handleContactWorker = (workerId: string, workerName: string) => {
    if (selectedTask) {
      setMessagingData({
        taskId: selectedTask.id,
        otherUserId: workerId,
        otherUserName: workerName
      });
      setShowMessaging(true);
      setShowTaskDetails(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Tasks</h1>
          <p className="text-gray-600 flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            Springfield Village
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="mb-6">
          <p className="text-gray-600">
            {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {/* Task Grid */}
        {filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onApply={() => handleViewDetails(task.id)}
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No tasks found</h3>
            <p className="text-gray-600">Try adjusting your search filters to find what you're looking for.</p>
          </div>
        )}
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          isOpen={showTaskDetails}
          onClose={() => {
            setShowTaskDetails(false);
            setSelectedTask(null);
          }}
          onApply={handleApply}
          onAcceptApplication={handleAcceptApplication}
          onContactWorker={handleContactWorker}
        />
      )}

      {/* Messaging Modal */}
      {messagingData && (
        <MessagingModal
          isOpen={showMessaging}
          onClose={() => {
            setShowMessaging(false);
            setMessagingData(null);
          }}
          taskId={messagingData.taskId}
          otherUserId={messagingData.otherUserId}
          otherUserName={messagingData.otherUserName}
        />
      )}
    </div>
  );
};

export default BrowseTasksPage;
