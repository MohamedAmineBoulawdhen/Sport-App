import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { createAsyncThunk } from '@reduxjs/toolkit'

import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
})

interface Session {
  _id: string
  name: string
  [key: string]: any
}
////////////////////////////////////////

export const createSession = createAsyncThunk(
  '/sessions/createSession', //must be unique
  async (sessionData: any, { rejectWithValue }) => {
    try {
      const response = await api.post(
        '/sessions/createSession',
        JSON.stringify(sessionData),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      // console.log(response.data)
      return response.data.session
    } catch (error: any) {
      return rejectWithValue(error.response.data.msg)
    }
  },
)

///////////////////////////////////////

/////////////
export const loadSesssions = createAsyncThunk(
  '/sessions/loadSesssions', //must be unique
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/sessions')
      // console.log(response);
      return response.data
    } catch (error: any) {
      // console.log("error.response",error.response ,"error.response.status",error.response.statusText)
      return rejectWithValue(error?.response?.data)
    }
  },
)
//////////////
export const UpdateSession = createAsyncThunk(
  '/sessions/UpdateSession', //must be unique
  async ({ _id, rest }: { _id: any; rest: Object }, { rejectWithValue }) => {
    try {
      // console.log(JSON.stringify(rest))
      const response = await api.patch(
        `/sessions/${_id}`,
        JSON.stringify(rest),
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
export const deleteSession = createAsyncThunk(
  '/sessions/deleteSession', //must be unique
  async ({ _id }: { _id: any }, { rejectWithValue }) => {
    try {
      // console.log(_id)
      const response = await api.delete(`/sessions/${_id}`)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error.response.data)
    }
  },
)
///////////////////
interface SessionState {
  sessions: Session[]
  error: string | null
}

const initialState: SessionState = {
  sessions: [],
  error: null,
}

const sessionSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    setSession: (state, action) => {
      state.sessions = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    resetError: state => {
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadSesssions.fulfilled, (state, action: PayloadAction<any>) => {
        state.sessions = action.payload
        state.error = null
      })
      .addCase(loadSesssions.rejected, (state, action: PayloadAction<any>) => {
        state.sessions = []
        state.error = action.payload
      })
      .addCase(
        createSession.fulfilled,
        (state, action: PayloadAction<Session>) => {
          state.error = null
          if (action.payload) {
            state.sessions.push(action.payload)
          }
        },
      )
      .addCase(createSession.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload
      })
      .addCase(UpdateSession.fulfilled, (state, action: PayloadAction<any>) => {
        const id = action.payload._id
        state.sessions = state.sessions?.filter(
          (session: any) => session?._id !== id,
        )
        state.sessions.push(action.payload)
        state.error = null
      })
      .addCase(UpdateSession.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload
      })
      .addCase(deleteSession.fulfilled, (state, action: PayloadAction<any>) => {
        state.error = null
        if (state.sessions) {
          state.sessions = state.sessions?.filter(
            (session: any) => session?._id !== action.payload._id,
          )
        }
      })
      .addCase(deleteSession.rejected, (state, action: PayloadAction<any>) => {
        state.error = action.payload
      })
  },
})

export const { setSession, setError, resetError } = sessionSlice.actions

export default sessionSlice.reducer
