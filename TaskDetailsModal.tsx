import React, { useState } from 'react';
import { X, Star, Phone, MessageCircle, DollarSign, Calendar, MapPin, User, Clock } from 'lucide-react';
import { Task, Application } from '../types';
import { mockApplications } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

interface TaskDetailsModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
  onApply?: (taskId: string, message: string, proposedPrice: number) => void;
  onAcceptApplication?: (applicationId: string) => void;
  onContactWorker?: (workerId: string, workerName: string) => void;
}

const TaskDetailsModal: React.FC<TaskDetailsModalProps> = ({
  task,
  isOpen,
  onClose,
  onApply,
  onAcceptApplication,
  onContactWorker
}) => {
  const { user } = useAuth();
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [applicationMessage, setApplicationMessage] = useState('');
  const [proposedPrice, setProposedPrice] = useState(task.price);

  const applications = mockApplications.filter(app => app.taskId === task.id);
  const isTaskOwner = user?.name === task.postedBy;
  const hasApplied = applications.some(app => app.userId === user?.id);

  if (!isOpen) return null;

  const handleApply = () => {
    if (onApply && applicationMessage.trim()) {
      onApply(task.id, applicationMessage, proposedPrice);
      setShowApplicationForm(false);
      setApplicationMessage('');
      setProposedPrice(task.price);
      onClose();
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Task Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          {/* Task Info */}
          <div className="mb-8">
            {task.images && task.images.length > 0 && (
              <div className="mb-6">
                <img
                  src={task.images[0]}
                  alt={task.title}
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{task.title}</h3>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  task.status === 'open' ? 'bg-green-100 text-green-800' :
                  task.status === 'in_progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {task.status === 'open' ? 'Open' : task.status === 'in_progress' ? 'In Progress' : 'Completed'}
                </span>
              </div>
              <div className="text-right">
                <div className="flex items-center text-2xl font-bold text-green-600">
                  <DollarSign className="w-6 h-6 mr-1" />
                  {task.price}
                </div>
              </div>
            </div>

            <p className="text-gray-700 text-lg mb-6">{task.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-3" />
                <span>{task.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <User className="w-5 h-5 mr-3" />
                <span>Posted by {task.postedBy}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Calendar className="w-5 h-5 mr-3" />
                <span>Deadline: {new Date(task.deadline).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-3" />
                <span>{applications.length} application{applications.length !== 1 ? 's' : ''}</span>
              </div>
            </div>
          </div>

          {/* Applications Section (for task owner) */}
          {isTaskOwner && applications.length > 0 && (
            <div className="mb-8">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Applications ({applications.length})</h4>
              <div className="space-y-4">
                {applications.map((application) => (
                  <div key={application.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h5 className="font-semibold text-gray-900">{application.userName}</h5>
                        <div className="flex items-center mt-1">
                          {renderStars(Math.floor(application.userRating))}
                          <span className="ml-2 text-sm text-gray-600">({application.userRating})</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-lg font-bold text-green-600">
                          <DollarSign className="w-4 h-4 mr-1" />
                          {application.proposedPrice}
                        </div>
                        <span className="text-sm text-gray-500">
                          Applied {new Date(application.appliedDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{application.message}</p>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={() => onAcceptApplication?.(application.id)}
                        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Accept & Connect
                      </button>
                      <button
                        onClick={() => onContactWorker?.(application.userId, application.userName)}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </button>
                      {application.phone && (
                        <a
                          href={`tel:${application.phone}`}
                          className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                        >
                          <Phone className="w-4 h-4 mr-2" />
                          Call
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Application Form */}
          {!isTaskOwner && !hasApplied && task.status === 'open' && (
            <div className="mb-6">
              {!showApplicationForm ? (
                <button
                  onClick={() => setShowApplicationForm(true)}
                  className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
                >
                  Apply for This Task
                </button>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Apply for This Task</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Message
                      </label>
                      <textarea
                        value={applicationMessage}
                        onChange={(e) => setApplicationMessage(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        placeholder="Tell the task poster why you're the right person for this job..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Proposed Price (USD)
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          value={proposedPrice}
                          onChange={(e) => setProposedPrice(Number(e.target.value))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button
                        onClick={handleApply}
                        disabled={!applicationMessage.trim()}
                        className="flex-1 py-3 px-6 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-semibold hover:from-purple-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Submit Application
                      </button>
                      <button
                        onClick={() => setShowApplicationForm(false)}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Already Applied Message */}
          {!isTaskOwner && hasApplied && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-blue-600 mr-2" />
                <span className="text-blue-800 font-medium">
                  You have already applied for this task. The task poster will contact you if selected.
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsModal;