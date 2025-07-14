import { useEffect, useState } from 'react';
import { RouterProvider } from "react-router";
import { useAppDispatch } from './store/hooks';
import { fetchUser, logOut } from "./store/slices/authSlice";
import { initPreferedColorScheme } from './store/slices/uiPreferencesSlice';
import { router } from './router';
import LoadingIcon from './components/ui/icons/LoadingIcon';

export default function App() {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(true);

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
        logIn()
            .then(() => setLoading(false));
    }, [dispatch]);

    if (loading)
        return <LoadingIcon />
    return <RouterProvider router={router} />
}
