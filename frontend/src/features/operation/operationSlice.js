import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from './operationService';

const initialState = {
    operations: [],
    operation: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

// Crate new operation
export const create = createAsyncThunk('operations/crate', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await service.create(data, token);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
});

// Get operations
export const getAll = createAsyncThunk('operations/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await service.getAll(token);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
});

// Get operation
export const get = createAsyncThunk('operations/get', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await service.get(id, token);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
});

// Update operation
export const update = createAsyncThunk('operations/update', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await service.update(data, token);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
});

// Delete operation
export const remove = createAsyncThunk('operations/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await service.remove(id, token);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
});

export const operationSlice = createSlice({
    name: 'operation',
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
                state.operations.push(action.payload);               
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
                state.operations = action.payload;
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
                state.operation = action.payload;
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
                state.operation = action.payload;
                state.operations = state.operations.filter((operation) => operation._id !== action.payload._id);
                state.operations.push(action.payload);
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
                state.operations = state.operations.filter((operation) => operation._id !== action.payload.id);
            })
            .addCase(remove.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })                          
    }    
});

export const { reset, resetStatus } = operationSlice.actions;
export default operationSlice.reducer;