import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IntialState {
  status: boolean,
  user: object | null
}

const initialState: IntialState = {
  status: false,
  user: null
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<object>) => {
      state.status = true
      state.user = action.payload
    },
    logout: (state) => {
      state.status = false
      state.user = null
    }
  },
})

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions

export default authSlice.reducer