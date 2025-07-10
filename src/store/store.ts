import { configureStore } from '@reduxjs/toolkit';
import uiPreferencesReducer from './slices/uiPreferencesSlice';

const store = configureStore({
    reducer: {
        uiPreferences: uiPreferencesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
