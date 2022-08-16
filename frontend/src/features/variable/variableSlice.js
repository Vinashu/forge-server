import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from './variableService';

const initialState = {
    variables: [],
    variable: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

// Crate new variable
export const create = createAsyncThunk('variables/crate', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await service.create(data, token);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
});

// Get variables
export const getAll = createAsyncThunk('variables/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await service.getAll(token);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
});

// Get variable
export const get = createAsyncThunk('variables/get', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await service.get(id, token);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
});

// Update variable
export const update = createAsyncThunk('variables/update', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await service.update(data, token);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
});

// Delete variable
export const remove = createAsyncThunk('variables/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await service.remove(id, token);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
});

export const variableSlice = createSlice({
    name: 'variable',
    initialState,
    reducers: {
        reset: (state) => initialState,
        resetStatus: (state) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = false;
            state.message = "";
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(create.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(create.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = '';
                state.variables.push(action.payload);               
            })
            .addCase(create.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })   
            .addCase(getAll.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(getAll.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = '';
                state.variables = action.payload;
            })
            .addCase(getAll.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })        
            .addCase(get.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(get.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = '';
                state.variable = action.payload;
            })
            .addCase(get.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(update.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(update.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = '';
                state.variable = action.payload;
                state.variables = state.variables.filter((variable) => variable._id !== action.payload._id);
                state.variables.push(action.payload);
            })
            .addCase(update.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(remove.pending, (state) => {
                state.isLoading = true;
                state.message = '';
            })
            .addCase(remove.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.message = '';
                state.variables = state.variables.filter((variable) => variable._id !== action.payload.id);
            })
            .addCase(remove.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })                          
    }    
});

export const { reset, resetStatus } = variableSlice.actions;
export default variableSlice.reducer;