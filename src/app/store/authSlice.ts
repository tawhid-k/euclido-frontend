
import { getRequestWithToken} from '@/@/service/api-handler/get-manager';
import { googleToken, hasXsrfToken } from '@/@/service/api-handler/get-token';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  uuid: string;
  firstName: string;
  lastName: string
  email: string;
  userType: 'student' | 'recruiter';
  avatarPath: string;
}

interface AuthState {
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

export const fetchUserData = createAsyncThunk<
  User,
  string,
  { rejectValue: string }
>('auth/fetchUserData', async (token, thunkAPI) => {
  try {
    thunkAPI.dispatch(authSlice.actions.setLoading()); // Set status to loading
    const token = await hasXsrfToken()
    
    if (!token) {
      localStorage.clear()
      logout()
      return null
    }
    const response = await getRequestWithToken('auth/refresh-access-token', true)
    return response.result;
  } catch (error: any) {
    const message = error.response?.data?.message || 'Failed to fetch user data';
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoading(state) {
      state.status = 'loading';
    },
    logout(state) {
      state.user = null;
      state.status = 'succeeded';
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.clear()
        localStorage.removeItem('token');
      }
    },
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.status = 'succeeded';
      state.error = null;
      if (typeof window !== 'undefined') {
        const user = {
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          email: action.payload.email,
          avatar: action.payload.avatarPath
        }
        localStorage.setItem('user', JSON.stringify(user));
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchUserData.fulfilled, (state, action: PayloadAction<User>) => {
        if (typeof window !== 'undefined' && action.payload) {
          state.status = 'succeeded';
          state.user = action.payload;
          const user = {
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                avatar: action.payload.avatarPath
            }
            localStorage.setItem('user', JSON.stringify(user))
            
        }
      })
      .addCase(fetchUserData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
    
        state.user = null;
        if (typeof window !== 'undefined') {
          localStorage.removeItem('token');
        }
      });
  },
});

export const { logout, setLoading, setUser } = authSlice.actions;

export default authSlice.reducer;
