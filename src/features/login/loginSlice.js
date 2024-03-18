import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import conf from "../../conf/conf";

const initialState = {
    status: 'idle',
    tokenState: {},
    isJWTexpired: false,
    isJWTmalformed: false
}

const createScriptErr = createAction("script/createScriptAsync/rejected");
const getAllUserScriptsErr = createAction("script/getAllUserScriptsAsync/rejected");
const updatedScriptErr = createAction("script/updateScriptAsync/rejected");
const deletedScriptErr = createAction("script/deleteScriptAsync/rejected");
const correctSpellingAndGrammarErr = createAction("script/correctSpellingAndGrammarAsync/rejected");
const completeTheParaErr = createAction("script/completeTheParaAsync/rejected");
const getCurrentUserErr = createAction("script/getCurrentUserAsync/rejected");
const signupFulfilled = createAction("signup/fetchToken/fulfilled");


export const loginAsync = createAsyncThunk(
    'login/fetchToken',
    async (formVal, options) => {
        try {
            const response = await axios.post(`${conf.serverBaseUrl}/auth/login`, formVal);
          
            const token = response.data;
            return token;
        } catch (error) { 
       throw options.rejectWithValue(error?.response?.data);
        }
    }
)

export const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
       setTokenState: (state)=>{
        state.tokenState = {}
       }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAsync.pending, (state) => {
                state.status = 'loading';
        })
        .addCase(loginAsync.fulfilled, (state, action)=>{
                state.status = 'idle';
                state.tokenState = action.payload;
                state.isJWTexpired = false;
               localStorage.setItem('token', JSON.stringify(action.payload));
               state.isJWTmalformed = false;
        })
        .addCase(loginAsync.rejected, (state, action)=>{
          
            state.status = action.payload;
        })

        .addCase(createScriptErr, (state, action)=>{
    
            if((action.payload?.error === "jwt expired") || (action.payload?.error === "jwt malformed")){
                state.isJWTexpired = true;
                localStorage.removeItem("token");
                if(action.payload?.error === "jwt malformed"){
                    state.isJWTmalformed = true
                }
            }
        })

        .addCase(getAllUserScriptsErr, (state, action)=>{
    
            if((action.payload?.error === "jwt expired") || (action.payload?.error === "jwt malformed")){
                state.isJWTexpired = true;
                localStorage.removeItem("token");
                if(action.payload?.error === "jwt malformed"){
                    state.isJWTmalformed = true
                }
            }
        })

        .addCase(updatedScriptErr, (state, action)=>{
    
            if((action.payload?.error === "jwt expired") || (action.payload?.error === "jwt malformed")){
                state.isJWTexpired = true;
                localStorage.removeItem("token");
                if(action.payload?.error === "jwt malformed"){
                    state.isJWTmalformed = true
                }
            }
        })

        .addCase(deletedScriptErr, (state, action)=>{
    
            if((action.payload?.error === "jwt expired") || (action.payload?.error === "jwt malformed")){
                state.isJWTexpired = true;
                localStorage.removeItem("token");
                if(action.payload?.error === "jwt malformed"){
                    state.isJWTmalformed = true
                }
            }
        })

        .addCase(correctSpellingAndGrammarErr, (state, action)=>{
    
            if((action.payload?.error === "jwt expired") || (action.payload?.error === "jwt malformed")){
                state.isJWTexpired = true;
                localStorage.removeItem("token");
                if(action.payload?.error === "jwt malformed"){
                    state.isJWTmalformed = true
                }
            }
        })


        .addCase(completeTheParaErr, (state, action)=>{
    
            if((action.payload?.error === "jwt expired") || (action.payload?.error === "jwt malformed")){
                state.isJWTexpired = true;
                localStorage.removeItem("token");
                if(action.payload?.error === "jwt malformed"){
                    state.isJWTmalformed = true
                }
            }
        })


        .addCase(getCurrentUserErr, (state, action)=>{
    
            if((action.payload?.error === "jwt expired") || (action.payload?.error === "jwt malformed")){
                state.isJWTexpired = true;
                localStorage.removeItem("token");
                if(action.payload?.error === "jwt malformed"){
                    state.isJWTmalformed = true
                }
            }
        })

        
        .addCase(signupFulfilled, (state, action)=>{
            state.isJWTexpired = false
            state.isJWTmalformed = false
        })
    }
})

export const {setTokenState} = loginSlice.actions 

const loginReducer = loginSlice.reducer

export default loginReducer