import React from 'react';
import { Clock, MapPin, DollarSign, User, Calendar } from 'lucide-react';
import { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onApply?: (taskId: string) => void;
  onViewDetails?: (taskId: string) => void;
  showApplyButton?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  onApply, 
  onViewDetails, 
  showApplyButton = true 
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open':
        return 'Open';
      case 'in_progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {task.images && task.images.length > 0 && (
        <div className="h-48 overflow-hidden">
          <img
            src={task.images[0]}
            alt={task.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">{task.title}</h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
              {getStatusText(task.status)}
            </span>
          </div>
          <div className="text-right">
            <div className="flex items-center text-lg font-bold text-green-600">
              <DollarSign className="w-5 h-5 mr-1" />
              {task.price}
            </div>
          </div>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">{task.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            {task.location}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <User className="w-4 h-4 mr-2" />
            Posted by {task.postedBy}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar className="w-4 h-4 mr-2" />
            Deadline: {new Date(task.deadline).toLocaleDateString()}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-1" />
            {task.applicants.length} applicant{task.applicants.length !== 1 ? 's' : ''}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onViewDetails?.(task.id)}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              View Details
            </button>
            {showApplyButton && task.status === 'open' && (
              <button
                onClick={() => onApply?.(task.id)}
                className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200"
              >
                Apply Now
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;