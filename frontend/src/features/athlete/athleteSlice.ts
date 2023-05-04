import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
})

interface LoginCredentials {
  email: string
  password: string
}
////////////////////////////////////////

export const registerAthlete = createAsyncThunk(
  '/auth/registerAthlete',
  async (athleteData: Object, { rejectWithValue }) => {
    try {
      const response = await api.post(
        '/auth/registerAthlete',
        JSON.stringify(athleteData),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      return response.data.athlete
    } catch (error: any) {
      return rejectWithValue(error.response.data)
    }
  },
)

///////////////////////////////////////

//////////////////////////////
export const loginAthlete = createAsyncThunk(
  'auth/loginAthlete',
  async ({ email, password }: LoginCredentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { token } = response.data
      localStorage.setItem('token', token)
      return response.data.existingAthlete
    } catch (error: any) {
      return rejectWithValue(error?.response?.data)
    }
  },
)
///////////////////////////

/////////////
export const loadAthlete = createAsyncThunk(
  'auth/loadAthlete',
  async (_, { rejectWithValue }) => {
    try {
      const config = {
        headers: { Authorization: localStorage.getItem('token') },
      }
      if (!localStorage.getItem('token')) {
        throw new Error('Token not found in local storage')
      }
      const response = await api.get('/auth/currentAthlete', config)
      // console.log(response);
      return response.data
    } catch (error: any) {
      // console.log(error.response ,error.response.status)
      return rejectWithValue(error?.response?.data)
    }
  },
)
//////////////
export const updateAthlete = createAsyncThunk(
  '/auth/updateAthlete',
  async ({ id, data }: { id: string; data: Object }, { rejectWithValue }) => {
    try {
      const response = await api.patch(
        `/athletes/${id}`,
        JSON.stringify(data),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      // console.log(response.data)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response.data)
    }
  },
)

//////////////////
export const deleteAthlete = createAsyncThunk(
  'auth/deleteAthlete',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/athletes/${id}`)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response.data)
    }
  },
)
///////////////////

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    athlete: null,
    error: null,
  },
  reducers: {
    setAthlete: (state, action) => {
      state.isAuthenticated = true
      state.athlete = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    resetError: state => {
      state.error = null
    },
    logoutAthlete: state => {
      state.isAuthenticated = false
      state.athlete = null
      localStorage.removeItem('token')
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginAthlete.fulfilled, (state, action: PayloadAction<any>) => {
        state.isAuthenticated = true
        state.athlete = action.payload
        state.error = null
      })
      .addCase(loginAthlete.rejected, (state, action: PayloadAction<any>) => {
        state.isAuthenticated = false
        state.athlete = null
        state.error = action.payload
      })
      .addCase(loadAthlete.fulfilled, (state, action: PayloadAction<any>) => {
        state.isAuthenticated = true
        state.athlete = action.payload
        state.error = null
      })
      .addCase(loadAthlete.rejected, (state, action: PayloadAction<any>) => {
        state.isAuthenticated = false
        state.athlete = null
        state.error = action.payload
      })
      .addCase(
        registerAthlete.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.error = null
        },
      )
      .addCase(
        registerAthlete.rejected,
        (state, action: PayloadAction<any>) => {
          state.error = action.payload
        },
      )
      .addCase(updateAthlete.fulfilled, (state, action: PayloadAction<any>) => {
        state.athlete = action.payload
        state.error = null
      })
      .addCase(updateAthlete.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload
      })
      .addCase(deleteAthlete.fulfilled, (state, action: PayloadAction<any>) => {
        state.error = null
        state.isAuthenticated = false
        state.athlete = null
        localStorage.removeItem('token')
      })
      .addCase(deleteAthlete.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload
      })
  },
})

export const { setAthlete, setError, resetError, logoutAthlete } =
  authSlice.actions

export default authSlice.reducer
