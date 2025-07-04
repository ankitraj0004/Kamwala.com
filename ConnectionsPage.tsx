import React from 'react';
import { MessageCircle, Phone, CheckCircle, Clock, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockConnections, mockTasks } from '../data/mockData';

const ConnectionsPage: React.FC = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  const myConnections = mockConnections.filter(
    conn => conn.workerId === user.id || conn.posterId === user.id
  );

  const getConnectionDetails = (connection: any) => {
    const task = mockTasks.find(t => t.id === connection.taskId);
    const isWorker = connection.workerId === user.id;
    const otherPersonName = isWorker ? connection.posterName : connection.workerName;
    const role = isWorker ? 'Worker' : 'Task Poster';
    
    return { task, otherPersonName, role, isWorker };
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
        return 'bg-blue-100 text-blue-800';
      case 'working':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected':
        return 'Connected';
      case 'working':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Connections</h1>
          <p className="text-gray-600">
            Manage your active work connections and communications
          </p>
        </div>

        {/* Connections List */}
        {myConnections.length > 0 ? (
          <div className="space-y-6">
            {myConnections.map((connection) => {
              const { task, otherPersonName, role, isWorker } = getConnectionDetails(connection);
              
              if (!task) return null;
              
              return (
                <div key={connection.id} className="bg-white rounded-xl shadow-md p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 mr-3">{task.title}</h3>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(connection.status)}`}>
                          {getStatusText(connection.status)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{task.description}</p>
                      <div className="flex items-center text-sm text-gray-500">
                        <span className="mr-4">Connected with: <strong>{otherPersonName}</strong></span>
                        <span className="mr-4">Your role: <strong>{role}</strong></span>
                        <span>Agreed price: <strong>${connection.agreedPrice}</strong></span>
                      </div>
                    </div>
                    
                    {task.images && task.images.length > 0 && (
                      <div className="ml-6">
                        <img
                          src={task.images[0]}
                          alt={task.title}
                          className="w-24 h-24 object-cover rounded-lg"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-500">
                      Connected on {new Date(connection.connectedDate).toLocaleDateString()}
                    </div>
                    
                    <div className="flex space-x-3">
                      <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Message
                      </button>
                      <button className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </button>
                      {connection.status === 'working' && (
                        <button className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Mark Complete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No connections yet</h3>
            <p className="text-gray-600">
              When you connect with someone for a task, you'll see your active connections here.
            </p>
          </div>
        )}

        {/* Tips Section */}
        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Connection Tips:</h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Communicate clearly about expectations and timeline
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Share contact information for easier coordination
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Mark tasks as complete when finished to build your reputation
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
              Leave reviews to help other community members
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ConnectionsPage;