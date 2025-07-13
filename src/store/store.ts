import { configureStore } from '@reduxjs/toolkit';
import uiPreferencesReducer from './slices/uiPreferencesSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
    reducer: {
        uiPreferences: uiPreferencesReducer,
        auth: authReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
