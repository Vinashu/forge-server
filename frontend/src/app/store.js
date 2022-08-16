import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import categoryReducer from '../features/category/categorySlice';
import variableReducer from '../features/variable/variableSlice';
import operationReducer from '../features/operation/operationSlice';
import rewardReducer from '../features/reward/rewardSlice';
import targetReducer from '../features/target/targetSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		category: categoryReducer,
		variable: variableReducer,
		operation: operationReducer,
		reward: rewardReducer,
		target: targetReducer,
	},
});
