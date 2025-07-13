import api from '@/api';
import { type IApplicationUser } from '@/models/ApplicationUser';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { AppDispatch } from '../store';

interface UserState {
    user: IApplicationUser | null,
    requireLogIn: boolean,
}

const initialState: UserState = {
    user: null,
    requireLogIn: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state: UserState, action: PayloadAction<IApplicationUser>) {
            state.user = action.payload;
        },
        requestLogIn(state: UserState) {
            state.requireLogIn = true;
        },
        resetAuthSlice(state: UserState) {
            state.user = {};
            state.requireLogIn = false;
        },
    },
});

export const { setUser, requestLogIn, resetAuthSlice } = authSlice.actions;

export const fetchUser = () => async (dispatch: AppDispatch) => {
    const userResponse: IApplicationUser = await api.get('/whoami');
    dispatch(setUser(userResponse));
}

export const logOut = () => async (dispatch: AppDispatch) => {
    api.logOut();
    dispatch(resetAuthSlice());
}

export default authSlice.reducer;
