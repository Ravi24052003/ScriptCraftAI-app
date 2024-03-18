import { configureStore } from '@reduxjs/toolkit'
import loginReducer from '../features/login/loginSlice'
import signupReducer from '../features/signup/signupSlice'
import scriptReducer from '../features/script/scriptSlice'

export const store = configureStore({
  reducer: {
    login: loginReducer,
    signup: signupReducer,
    script: scriptReducer
  },
})