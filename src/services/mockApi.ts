import { User, UserResponse } from '../types/user';

// Sample user data
const generateUsers = (count: number): User[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    phone: `+1-555-${String(index + 1).padStart(4, '0')}`,
    company: `Company ${index + 1}`,
    address: `${index + 100} Main Street, City ${index + 1}`,
    joinDate: new Date(2023, index % 12, (index % 28) + 1).toISOString(),
  }));
};

// Total users in our "database"
const TOTAL_USERS = 100;
const ALL_USERS = generateUsers(TOTAL_USERS);

interface FetchUsersParams {
  page: number;
  pageSize: number;
  searchTerm?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

// Simulated API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchUsers = async ({
  page,
  pageSize,
  searchTerm = '',
  sortBy,
  sortOrder = 'asc',
}: FetchUsersParams): Promise<UserResponse> => {
  // Simulate API delay
  await delay(800);

  let filteredUsers = [...ALL_USERS];

  // Apply search
  if (searchTerm) {
    filteredUsers = filteredUsers.filter(user => 
      Object.values(user).some(value => 
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }

  // Apply sorting
  if (sortBy) {
    filteredUsers.sort((a, b) => {
      const aValue = a[sortBy as keyof User];
      const bValue = b[sortBy as keyof User];
      return sortOrder === 'asc' 
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }

  // Calculate pagination
  const start = (page - 1) * pageSize;
  const paginatedUsers = filteredUsers.slice(start, start + pageSize);

  return {
    users: paginatedUsers,
    total: filteredUsers.length,
    page,
    pageSize,
  };
};
