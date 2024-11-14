import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../utils/api';

// 필요한 API들
// 1. signup
// 2. loginWithEmail
// 3. loginWithToken
// 4. googleLogin
// 5. logout

// Sign-up
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ name, email, password, navigate }, { rejectWithValue }) => {
    try {
      const response = await api.post('/user', { email, name, password });
      window.alert('Congratulations on signing up!');

      navigate('/login');

      // Check if response has the expected structure
      return response.data?.data || response.data;
    } catch (error) {
      console.log('Error:', error.response);

      // Handle error with a more informative message if available
      return rejectWithValue(
        error.response?.data?.message || error.message || 'Registration failed'
      );
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
