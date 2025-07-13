import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AppDispatch } from '../store';

interface UiPreferencesState {
    scheme: string;
    preferedScheme: string;
}

const initialState: UiPreferencesState = {
    scheme: 'light',
    preferedScheme: 'auto',
};

const uiPreferencesSlice = createSlice({
    name: 'uiPreferences',
    initialState,
    reducers: {
        setColorScheme(state: UiPreferencesState, action: PayloadAction<string>) {
            state.scheme = action.payload;
        },
        setPreferedScheme(state: UiPreferencesState, action: PayloadAction<string>) {
            state.preferedScheme = action.payload;
        },
    },
});

export const { setColorScheme, setPreferedScheme } = uiPreferencesSlice.actions;

export const applyColorScheme = (scheme: string) => (dispatch: AppDispatch) => {
    if (scheme === 'auto') {
        localStorage.setItem('prefered-color-scheme', 'auto');
        const preferesDarkColorScheme = window.matchMedia('(prefers-color-scheme: dark)');
        if (preferesDarkColorScheme.matches)
            document.documentElement.classList.add('dark');
        else
            document.documentElement.classList.remove('dark');
    } else if (scheme === 'light') {
        document.documentElement.classList.remove('dark');
    } else if (scheme === 'dark') {
        document.documentElement.classList.add('dark');
    }
    dispatch(setColorScheme(scheme));
};

export const setAndStorePreferedScheme = (scheme: string) => (dispatch: AppDispatch) => {
    localStorage.setItem('prefered-color-scheme', scheme);
    dispatch(setPreferedScheme(scheme));
};

export const initPreferedColorScheme = () => (dispatch: AppDispatch) => {
    let preferedColorScheme = localStorage.getItem('prefered-color-scheme') || 'auto';
    dispatch(setPreferedScheme(preferedColorScheme));
    dispatch(applyColorScheme(preferedColorScheme));

    const preferesDarkColorScheme = window.matchMedia('(prefers-color-scheme: dark)');
    preferesDarkColorScheme.addEventListener('change', e => {
        let preferedColorScheme = localStorage.getItem('prefered-color-scheme') || 'auto';
        if (preferedColorScheme === 'auto')
            dispatch(applyColorScheme(e.matches ? 'dark' : 'light'));
    });
};

export default uiPreferencesSlice.reducer;
