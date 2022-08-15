import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import service from './categoryService';

const initialState = {
    categories: [],
    category: {},
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
};

// Crate new category
export const create = createAsyncThunk('categories/crate', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await service.create(data, token);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
});

// Get categories
export const getAll = createAsyncThunk('categories/getAll', async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await service.getAll(token);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
});

// Get category
export const get = createAsyncThunk('categories/get', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await service.get(id, token);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
});

// Update category
export const update = createAsyncThunk('categories/update', async (data, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await service.update(data, token);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
});

// Delete category
export const remove = createAsyncThunk('categories/delete', async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await service.remove(id, token);
    } catch (error) {
       const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
       return thunkAPI.rejectWithValue(message);
    }
});

export const categorySlice = createSlice({
    name: 'category',
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
                state.categories.push(action.payload);               
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
                state.categories = action.payload;
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
                state.category = action.payload;
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
                state.category = action.payload;
                state.categories = state.categories.filter((category) => category._id !== action.payload._id);
                state.categories.push(action.payload);
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
                state.categories = state.categories.filter((category) => category._id !== action.payload.id);
            })
            .addCase(remove.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })                          
    }    
});

export const { reset, resetStatus } = categorySlice.actions;
export default categorySlice.reducer;