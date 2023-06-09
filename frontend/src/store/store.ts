import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/athlete/athleteSlice'
import sessionReducer from '../features/session/sessionSlice'

// Define the type of my Redux store state
type RootState = ReturnType<typeof store.getState>

const store = configureStore({
  reducer: {
    auth: authReducer,
    session: sessionReducer,
  },
})

export default store
// Export the RootState type for use in other parts of your app
export type { RootState }
