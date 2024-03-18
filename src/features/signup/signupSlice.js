import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import conf from "../../conf/conf";

const initialState = {
    status: 'idle',
    tokenState: {}
}

export const signupAsync = createAsyncThunk(
    'signup/fetchToken',
    async (formVal, options) => {
        try {
            const response = await axios.post(`${conf.serverBaseUrl}/auth/signup`, formVal);
           
            const token = response.data;
            return token;
        } catch (error) { 
       throw options.rejectWithValue(error?.response?.data?.error);
        }
    }
)

export const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
       setTokenState: (state)=>{
         state.tokenState = {}
       }
    },
    extraReducers: (builder) => {
        builder
            .addCase(signupAsync.pending, (state) => {
                state.status = 'loading';
        })
        .addCase(signupAsync.fulfilled, (state, action)=>{
                state.status = 'idle';
                state.tokenState = action.payload;
                localStorage.setItem('token', JSON.stringify(action.payload));
        })
        .addCase(signupAsync.rejected, (state, action)=>{
            state.status = action.payload;
        })
    }
})

export const {setTokenState} = signupSlice.actions

const signupReducer = signupSlice.reducer

export default signupReducer