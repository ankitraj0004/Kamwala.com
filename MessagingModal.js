import React, { useState } from 'react';
import { X, Send, Phone, User } from 'lucide-react';
import { Message } from '../types';
import { mockMessages } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';

interface MessagingModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskId: string;
  otherUserId: string;
  otherUserName: string;
}

const MessagingModal: React.FC<MessagingModalProps> = ({
  isOpen,
  onClose,
  taskId,
  otherUserId,
  otherUserName
}) => {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>(
    mockMessages.filter(msg => msg.taskId === taskId)
  );

  if (!isOpen || !user) return null;

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        taskId,
        senderId: user.id,
        senderName: user.name,
        receiverId: otherUserId,
        content: newMessage,
        timestamp: new Date().toISOString(),
        type: 'text'
      };
      
      setMessages([...messages, message]);
      setNewMessage('');
    }
  };

  const handleShareContact = () => {
    const contactMessage: Message = {
      id: Date.now().toString(),
      taskId,
      senderId: user.id,
      senderName: user.name,
      receiverId: otherUserId,
      content: `📞 Contact me: ${user.phone || 'Phone number not provided'}`,
      timestamp: new Date().toISOString(),
      type: 'contact_share'
    };
    
    setMessages([...messages, contactMessage]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full h-[600px] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mr-3">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{otherUserName}</h3>
              <p className="text-sm text-gray-500">Task Discussion</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <p>No messages yet. Start the conversation!</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.senderId === user.id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.senderId === user.id
                      ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className={`text-xs mt-1 ${
                    message.senderId === user.id ? 'text-purple-100' : 'text-gray-500'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex items-center space-x-2 mb-3">
            <button
              onClick={handleShareContact}
              className="flex items-center px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm"
            >
              <Phone className="w-4 h-4 mr-1" />
              Share Contact
            </button>
          </div>
          
          <div className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingModal;
