import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from './targetService';

const initialState = {
    targets: [],
    target: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

// Crate new target
export const create = createAsyncThunk('targets/crate', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await service.create(data, token);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
});

// Get targets
export const getAll = createAsyncThunk('targets/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await service.getAll(token);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
});

// Get target
export const get = createAsyncThunk('targets/get', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await service.get(id, token);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
});

// Update target
export const update = createAsyncThunk('targets/update', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await service.update(data, token);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
});

// Delete target
export const remove = createAsyncThunk('targets/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await service.remove(id, token);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
});

export const targetSlice = createSlice({
    name: 'target',
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
                state.targets.push(action.payload);               
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
                state.targets = action.payload;
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
                state.target = action.payload;
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
                state.target = action.payload;
                state.targets = state.targets.filter((target) => target._id !== action.payload._id);
                state.targets.push(action.payload);
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
                state.targets = state.targets.filter((target) => target._id !== action.payload.id);
            })
            .addCase(remove.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })                          
    }    
});

export const { reset, resetStatus } = targetSlice.actions;
export default targetSlice.reducer;