

import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import connectionsReducer from "./connectionsSlice"
import feedReducer from "./feedSlice"
import requestReducer from "./requestSlice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    feed:feedReducer,
    connections:connectionsReducer,
    requests:requestReducer,
          
  },
})

