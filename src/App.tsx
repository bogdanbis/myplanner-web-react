import { useEffect } from 'react';
import { RouterProvider } from "react-router";
import { useAppDispatch } from './store/hooks';
import { fetchUser, logOut } from "./store/slices/authSlice";
import { initPreferedColorScheme } from './store/slices/uiPreferencesSlice';
import { router } from './router';

export default function App() {
    const dispatch = useAppDispatch();

    const logIn = async () => {
        if (localStorage.getItem('token')) {
            try {
                await dispatch(fetchUser());
            } catch (e) {
                dispatch(logOut());
            }
        }
    }

    useEffect(() => {
        dispatch(initPreferedColorScheme());
        logIn();
    }, [dispatch]);

    return (
        <RouterProvider router={router} />
    )
}
