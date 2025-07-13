import { configureStore } from '@reduxjs/toolkit';
import uiPreferencesReducer from './slices/uiPreferencesSlice';
import authReducer from './slices/authSlice';
import publicPlansReducer from './slices/publicPlansSlice';

const store = configureStore({
    reducer: {
        uiPreferences: uiPreferencesReducer,
        auth: authReducer,
        publicPlans: publicPlansReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
