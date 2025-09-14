import axios from 'axios';
import { User } from '../types/user';

interface ApiResponse {
  users: User[];
  total: number;
  page: number;
  pageSize: number;
  // add other fields your API returns
}

interface FetchUsersParams {
  page: number;
  pageSize: number;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

const BASE_URL = 'YOUR_BACKEND_API_URL'; // Replace with your actual API URL

export const fetchUsers = async ({
  page,
  pageSize,
  searchTerm,
  sortBy,
  sortOrder
}: FetchUsersParams): Promise<ApiResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/users`, {
      params: {
        page,
        limit: pageSize,
        search: searchTerm,
        sortBy,
        sortOrder,
        // adjust these parameter names according to your API
      }
    });

    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// If you need to add more API calls in the future, just add more functions:
export const createUser = async (userData: Partial<User>) => {
  try {
    const response = await axios.post(`${BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

// Example of another API call
export const updateUser = async (id: number, userData: Partial<User>) => {
  try {
    const response = await axios.put(`${BASE_URL}/users/${id}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};