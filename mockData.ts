import { Task, Application, Message, Connection } from '../types';

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Garden Maintenance',
    description: 'Need help with weeding, pruning, and general garden cleanup. About 3-4 hours of work.',
    category: 'Gardening',
    price: 80,
    location: 'Springfield Village',
    postedBy: 'Sarah Johnson',
    postedDate: '2024-01-20',
    deadline: '2024-01-25',
    status: 'open',
    applicants: ['2', '3'],
    images: ['https://images.pexels.com/photos/1301856/pexels-photo-1301856.jpeg?auto=compress&cs=tinysrgb&w=400']
  },
  {
    id: '2',
    title: 'Moving Help',
    description: 'Need 2 people to help move furniture and boxes to new apartment. Heavy lifting required.',
    category: 'Moving',
    price: 120,
    location: 'Springfield Village',
    postedBy: 'Mike Chen',
    postedDate: '2024-01-19',
    deadline: '2024-01-22',
    status: 'open',
    applicants: ['4'],
    images: ['https://images.pexels.com/photos/7464230/pexels-photo-7464230.jpeg?auto=compress&cs=tinysrgb&w=400']
  },
  {
    id: '3',
    title: 'Dog Walking',
    description: 'Looking for someone to walk my golden retriever twice a day for a week while I\'m traveling.',
    category: 'Pet Care',
    price: 100,
    location: 'Springfield Village',
    postedBy: 'Emma Davis',
    postedDate: '2024-01-18',
    deadline: '2024-01-30',
    status: 'open',
    applicants: ['5', '6'],
    images: ['https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=400']
  },
  {
    id: '4',
    title: 'House Cleaning',
    description: 'Deep cleaning needed for 3-bedroom house. Kitchen, bathrooms, and living areas.',
    category: 'Cleaning',
    price: 150,
    location: 'Springfield Village',
    postedBy: 'Robert Wilson',
    postedDate: '2024-01-17',
    deadline: '2024-01-24',
    status: 'in_progress',
    applicants: ['7'],
    assignedTo: '7',
    images: ['https://images.pexels.com/photos/4239031/pexels-photo-4239031.jpeg?auto=compress&cs=tinysrgb&w=400']
  },
  {
    id: '5',
    title: 'Grocery Shopping',
    description: 'Need someone to do weekly grocery shopping. List will be provided.',
    category: 'Shopping',
    price: 40,
    location: 'Springfield Village',
    postedBy: 'Lisa Brown',
    postedDate: '2024-01-16',
    deadline: '2024-01-21',
    status: 'completed',
    applicants: ['8'],
    assignedTo: '8',
    images: ['https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400']
  },
  {
    id: '6',
    title: 'Computer Repair',
    description: 'Laptop won\'t start up. Need someone with technical expertise to diagnose and fix.',
    category: 'Technology',
    price: 90,
    location: 'Springfield Village',
    postedBy: 'Tom Anderson',
    postedDate: '2024-01-15',
    deadline: '2024-01-20',
    status: 'open',
    applicants: ['9'],
    images: ['https://images.pexels.com/photos/574069/pexels-photo-574069.jpeg?auto=compress&cs=tinysrgb&w=400']
  }
];

export const mockApplications: Application[] = [
  {
    id: '1',
    taskId: '1',
    userId: '2',
    userName: 'John Smith',
    userRating: 4.8,
    message: 'I have 5 years of gardening experience and can complete this task efficiently.',
    proposedPrice: 75,
    appliedDate: '2024-01-21',
    status: 'pending',
    phone: '+1-555-0123'
  },
  {
    id: '2',
    taskId: '1',
    userId: '3',
    userName: 'Maria Garcia',
    userRating: 4.9,
    message: 'Professional landscaper with tools. Available this weekend.',
    proposedPrice: 80,
    appliedDate: '2024-01-21',
    status: 'pending',
    phone: '+1-555-0124'
  },
  {
    id: '3',
    taskId: '2',
    userId: '4',
    userName: 'David Wilson',
    userRating: 4.7,
    message: 'Strong and reliable. Have helped with many moves in the area.',
    proposedPrice: 120,
    appliedDate: '2024-01-20',
    status: 'pending',
    phone: '+1-555-0125'
  }
];

export const mockMessages: Message[] = [
  {
    id: '1',
    taskId: '1',
    senderId: '1',
    senderName: 'Sarah Johnson',
    receiverId: '2',
    content: 'Hi John! I saw your application. When would you be available to start?',
    timestamp: '2024-01-21T10:30:00Z',
    type: 'text'
  },
  {
    id: '2',
    taskId: '1',
    senderId: '2',
    senderName: 'John Smith',
    receiverId: '1',
    content: 'Hello Sarah! I can start this Saturday morning. Would 8 AM work for you?',
    timestamp: '2024-01-21T11:15:00Z',
    type: 'text'
  }
];

export const mockConnections: Connection[] = [
  {
    id: '1',
    taskId: '4',
    workerId: '7',
    workerName: 'Alex Thompson',
    posterId: '1',
    posterName: 'Robert Wilson',
    status: 'working',
    connectedDate: '2024-01-18',
    agreedPrice: 150
  }
];

export const categories = [
  'All Categories',
  'Gardening',
  'Moving',
  'Pet Care',
  'Cleaning',
  'Shopping',
  'Technology',
  'Handyman',
  'Tutoring',
  'Cooking',
  'Other'
];