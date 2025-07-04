export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  location: string;
  postedBy: string;
  postedDate: string;
  deadline: string;
  status: 'open' | 'in_progress' | 'completed';
  applicants: string[];
  assignedTo?: string;
  images?: string[];
}

export interface User {
  id: string;
  email: string;
  name: string;
  location: string;
  avatar?: string;
  rating: number;
  completedTasks: number;
  joinedDate: string;
  phone?: string;
  skills?: string[];
}

export interface Application {
  id: string;
  taskId: string;
  userId: string;
  userName: string;
  userRating: number;
  message: string;
  proposedPrice: number;
  appliedDate: string;
  status: 'pending' | 'accepted' | 'rejected';
  phone?: string;
}

export interface Message {
  id: string;
  taskId: string;
  senderId: string;
  senderName: string;
  receiverId: string;
  content: string;
  timestamp: string;
  type: 'text' | 'contact_share';
}

export interface Connection {
  id: string;
  taskId: string;
  workerId: string;
  workerName: string;
  posterId: string;
  posterName: string;
  status: 'connected' | 'working' | 'completed';
  connectedDate: string;
  agreedPrice: number;
}