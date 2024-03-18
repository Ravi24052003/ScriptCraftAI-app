import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import conf from "../../conf/conf";

const initialState = {
    status: 'idle',
    userScripts: [],
    script: {},
    AIgeneratedScript: {},
    currentUser: {},
    SandGstatus: 'idle',
    completeTheParaStatus: 'idle',
    isScriptCreated: false
}

export const createScriptAsync = createAsyncThunk(
    'script/createScriptAsync',
    async (formVal, options) => {
        try {

            const tokenObj =  JSON.parse(localStorage.getItem('token'));

            const response = await axios.post(`${conf.serverBaseUrl}/script/create`, formVal, {
                headers: {
                    "Authorization": "Bearer "+tokenObj?.token
                }
            });
           
            const script = response.data;

            return script;
        } catch (error) { 
          
       throw options.rejectWithValue(error?.response?.data);
        }
    }
)




export const getAllUserScriptsAsync = createAsyncThunk(
    'script/getAllUserScriptsAsync',
    async (_, options) => {
        try {

            const tokenObj =  JSON.parse(localStorage.getItem('token'));

            const response = await axios.get(`${conf.serverBaseUrl}/script/userScripts`, {
                headers: {
                    "Authorization": "Bearer "+tokenObj?.token
                }
            });
           
            const scripts = response.data;
            return scripts;
        } catch (error) { 
       throw options.rejectWithValue(error?.response?.data);
        }
    }
)



export const updateScriptAsync = createAsyncThunk(
    'script/updateScriptAsync',
    async ({scriptTitle, genre, script, id}, options) => {
        try {

            const tokenObj =  JSON.parse(localStorage.getItem('token'));


            const response = await axios.patch(`${conf.serverBaseUrl}/script/update/${id}`, {scriptTitle, genre, script}, {
                headers: {
                    "Authorization": "Bearer "+tokenObj?.token
                }
            });
           
            const updatedScript = response.data;
            return updatedScript;
        } catch (error) { 
       throw options.rejectWithValue(error?.response?.data);
        }
    }
)



export const deleteScriptAsync = createAsyncThunk(
    'script/deleteScriptAsync',
    async (id, options) => {
        try {

            const tokenObj =  JSON.parse(localStorage.getItem('token'));


            const response = await axios.delete(`${conf.serverBaseUrl}/script/delete/${id}`, {
                headers: {
                    "Authorization": "Bearer "+tokenObj?.token
                }
            });
           
            const deletedScript = response.data;
            return deletedScript;
        } catch (error) { 
       throw options.rejectWithValue(error?.response?.data);
        }
    }
)



export const correctSpellingAndGrammarAsync = createAsyncThunk(
    'script/correctSpellingAndGrammarAsync',
    async (script, options) => {
        try {

            const tokenObj =  JSON.parse(localStorage.getItem('token'));

            const response = await axios.post(`${conf.serverBaseUrl}/script/spelling-grammar`, script, {
                headers: {
                    "Authorization": "Bearer "+tokenObj?.token
                }
            });
           
            const AIgeneratedScript = response.data;
            return AIgeneratedScript;
        } catch (error) { 
       throw options.rejectWithValue(error?.response?.data);
        }
    }
)


export const completeTheParaAsync = createAsyncThunk(
    'script/completeTheParaAsync',
    async (script, options) => {
        try {

            const tokenObj =  JSON.parse(localStorage.getItem('token'));


            const response = await axios.post(`${conf.serverBaseUrl}/script/complete-para`, script, {
                headers: {
                    "Authorization": "Bearer "+tokenObj?.token
                }
            });
           
            const AIgeneratedScript = response.data;
            return AIgeneratedScript;
        } catch (error) { 
       throw options.rejectWithValue(error?.response?.data);
        }
    }
)



export const getCurrentUserAsync = createAsyncThunk(
    'script/getCurrentUserAsync',
    async (_, options) => {
        try {

            const tokenObj =  JSON.parse(localStorage.getItem('token'));

            const response = await axios.get(`${conf.serverBaseUrl}/user/user`, {
                headers: {
                    "Authorization": "Bearer "+tokenObj?.token
                }
            });
           
            const currentUser = response.data;
            return currentUser;
        } catch (error) { 
       throw options.rejectWithValue(error?.response?.data);
        }
    }
)



export const scriptSlice = createSlice({
    name: 'script',
    initialState,
    reducers: {
     setScript: (state, action)=>{
       state.script = action.payload
     },
     setAIgeneratedScript: (state)=>{
        state.AIgeneratedScript = {}
     },
     setStatus: (state)=>{
        state.status = "idle"
        state.SandGstatus = 'idlde'
        state.completeTheParaStatus = 'idle'
     },
     setIsScriptCreated: (state)=>{
        state.isScriptCreated = false
     }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createScriptAsync.pending, (state) => {
                state.status = 'loading';
        })
        .addCase(createScriptAsync.fulfilled, (state, action)=>{
                state.status = 'idle';
                state.userScripts = [action.payload, ...state.userScripts];
                state.AIgeneratedScript = {}
                state.isScriptCreated = true
        })
        .addCase(createScriptAsync.rejected, (state, action)=>{
            state.status = action.payload;
        })

        .addCase(getAllUserScriptsAsync.pending, (state) => {
            state.status = 'loading';
    })
    .addCase(getAllUserScriptsAsync.fulfilled, (state, action)=>{
            state.status = 'idle';
            state.userScripts = action.payload;
    })
    .addCase(getAllUserScriptsAsync.rejected, (state, action)=>{
        state.status = action.payload;
    })


    .addCase(updateScriptAsync.pending, (state) => {
        state.status = 'loading';
})
.addCase(updateScriptAsync.fulfilled, (state, action)=>{
        state.status = 'idle';
        const index = state.userScripts.findIndex((elem)=> elem._id == action.payload._id );

        state.userScripts.splice(index, 1, action.payload);

        state.script = {}

        state.AIgeneratedScript = {}
})
.addCase(updateScriptAsync.rejected, (state, action)=>{
    state.status = action.payload;
})



.addCase(deleteScriptAsync.pending, (state) => {
    state.status = 'loading';
})
.addCase(deleteScriptAsync.fulfilled, (state, action)=>{
    state.status = 'idle';
    const index = state.userScripts.findIndex((elem)=> elem._id == action.payload._id );

    state.userScripts.splice(index, 1);

})
.addCase(deleteScriptAsync.rejected, (state, action)=>{
state.status = action.payload;
})


.addCase(correctSpellingAndGrammarAsync.pending, (state) => {
    state.status = 'loading';
    state.SandGstatus = 'loading';
})
.addCase(correctSpellingAndGrammarAsync.fulfilled, (state, action)=>{
    state.status = 'idle';
    state.SandGstatus = 'idle';
    state.AIgeneratedScript = action.payload;

})
.addCase(correctSpellingAndGrammarAsync.rejected, (state, action)=>{
state.status = action.payload;
state.SandGstatus = action.payload;
})



.addCase(completeTheParaAsync.pending, (state) => {
    state.status = 'loading';
    state.completeTheParaStatus = 'loading';
})
.addCase(completeTheParaAsync.fulfilled, (state, action)=>{
    state.status = 'idle';
    state.completeTheParaStatus = 'idle';
    state.AIgeneratedScript = action.payload;

})
.addCase(completeTheParaAsync.rejected, (state, action)=>{
state.status = action.payload;
state.completeTheParaStatus = action.payload;
})



.addCase(getCurrentUserAsync.pending, (state) => {
    state.status = 'loading';
})
.addCase(getCurrentUserAsync.fulfilled, (state, action)=>{
    state.status = 'idle';
    state.currentUser = action.payload;

})
.addCase(getCurrentUserAsync.rejected, (state, action)=>{
state.status = action.payload;
})

    }
})

export const {setScript, setAIgeneratedScript, setStatus, setIsScriptCreated} = scriptSlice.actions

const scriptReducer = scriptSlice.reducer

export default scriptReducer