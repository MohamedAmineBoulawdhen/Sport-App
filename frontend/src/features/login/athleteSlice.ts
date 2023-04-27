import { createSlice,PayloadAction  } from '@reduxjs/toolkit';

import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
});

interface LoginCredentials {
  email: string;
  password: string;
}
////////////////////////////////////////

export const registerUser = createAsyncThunk(
  '/auth/registerAthlete',
  async (userData:Object, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/registerAthlete', JSON.stringify(userData),
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      );
      return response.data.athlete;
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);

///////////////////////////////////////


//////////////////////////////
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }:LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      return response.data.existingAthlete;
    } catch (error:any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);
///////////////////////////

/////////////
export const loadUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
    try {
      const config = {headers: { Authorization: localStorage.getItem('token') }}
      if (!localStorage.getItem('token')) {
        throw new Error('Token not found in local storage');
      }
      const response = await api.get('/auth/currentAthlete', config);
      // console.log(response);
      return response.data;
    } catch (error:any) {
      // console.log(error.response ,error.response.status)
      return rejectWithValue(error?.response?.data);
    }
  }
);
//////////////
export const updateUser = createAsyncThunk(
  '/auth/updateAthlete',
  async ({ id, data }: { id: string, data: Object }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/athletes/${id}`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // console.log(response.data)
      return response.data;
    } catch (error:any) {
      return rejectWithValue(error.response.data);
    }
  }
);

//////////////////
export const deleteUser = createAsyncThunk(
  'auth/deleteAthlete',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/athletes/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
///////////////////

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    user: null,
    error: null
  },
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
    logoutUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(loadUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loadUser.rejected, (state, action: PayloadAction<any>) => {
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      .addCase(updateUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      })
      .addCase(deleteUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.error = null;
        state.isAuthenticated = false;
        state.user = null;
        localStorage.removeItem('token');

      })
      .addCase(deleteUser.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload;
      });
  },
});

export const { setUser, setError, resetError, logoutUser } = authSlice.actions;

export default authSlice.reducer;