import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import categoryReducer from '../features/category/categorySlice';
import variableReducer from '../features/variable/variableSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    category: categoryReducer,
    variable: variableReducer,
  },
});
