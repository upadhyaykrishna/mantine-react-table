export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  joinDate: string;
}

export interface UserResponse {
  users: User[];
  total: number;
  page: number;
  pageSize: number;
}

export interface UserState {
  users: User[];
  total: number;
  loading: boolean;
  error: string | null;
  currentPage: number;
  pageSize: number;
}