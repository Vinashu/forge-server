import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from './rewardService';

const initialState = {
    rewards: [],
    reward: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

// Crate new reward
export const create = createAsyncThunk('rewards/crate', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await service.create(data, token);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
});

// Get rewards
export const getAll = createAsyncThunk('rewards/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await service.getAll(token);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
});

// Get reward
export const get = createAsyncThunk('rewards/get', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await service.get(id, token);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
});

// Update reward
export const update = createAsyncThunk('rewards/update', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await service.update(data, token);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
});

// Delete reward
export const remove = createAsyncThunk('rewards/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await service.remove(id, token);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
});

export const rewardSlice = createSlice({
    name: 'reward',
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
                state.rewards.push(action.payload);               
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
                state.rewards = action.payload;
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
                state.reward = action.payload;
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
                state.reward = action.payload;
                state.rewards = state.rewards.filter((reward) => reward._id !== action.payload._id);
                state.rewards.push(action.payload);
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
                state.rewards = state.rewards.filter((reward) => reward._id !== action.payload.id);
            })
            .addCase(remove.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })                          
    }    
});

export const { reset, resetStatus } = rewardSlice.actions;
export default rewardSlice.reducer;