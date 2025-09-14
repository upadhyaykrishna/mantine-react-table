import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { UserState, UserResponse } from '../../types/user';
import { fetchUsers } from '../../services/mockApi';

const initialState: UserState = {
  users: [],
  total: 0,
  loading: false,
  error: null,
  currentPage: 1,
  pageSize: 10,
};

export const fetchUserData = createAsyncThunk(
  'users/fetchUserData',
  async ({ 
    page, 
    pageSize, 
    searchTerm, 
    sortBy, 
    sortOrder 
  }: {
    page: number;
    pageSize: number;
    searchTerm?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => {
    const response = await fetchUsers({ page, pageSize, searchTerm, sortBy, sortOrder });
    return response;
  }
);

// If you were using a real API service, use this:
export const fetchUserDataAPI = createAsyncThunk(
  'users/fetchUserData',
  async ({ 
    page, 
    pageSize, 
    searchTerm, 
    sortBy, 
    sortOrder 
  }: {
    page: number;
    pageSize: number;
    searchTerm?: string;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
  }) => {
    // fetchUsers would be imported from your actual API service file (like userServices.ts in this case)
    const response = await fetchUsers({
      page,
      pageSize,
      searchTerm,
      sortBy,
      sortOrder,
    });
    return response;
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.currentPage = 1; // Reset to first page when changing page size
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<UserResponse>) => {
        state.loading = false;
        state.users = action.payload.users;
        state.total = action.payload.total;
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { setPageSize, setCurrentPage } = userSlice.actions;
export default userSlice.reducer;