import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mock login function - replace this with real API call later
const mockLoginAPI = async (credentials) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock validation
  if (credentials.email && credentials.password) {
    return {
      user: {
        id: 1,
        email: credentials.email,
        name: 'Test User'
      },
      token: 'mock-jwt-token'
    };
  }
  throw new Error('Invalid credentials');
};

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials) => {
    try {
      // Replace mockLoginAPI with your real API call when ready
      const response = await mockLoginAPI(credentials);
      // Store token in localStorage
      localStorage.setItem('token', response.token);
      return response;
    } catch (error) {
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token'), // Initialize token from localStorage
    isLoading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token'); // Clear token from localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('token', action.payload.token);

      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;