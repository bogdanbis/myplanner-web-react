import { useEffect } from 'react';
import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/layout/Layout";
import Explore from "./pages/Explore";
import MyPlans from "./pages/MyPlans";
import CreatedPlans from "./pages/creator/CreatedPlans";
import SentInvites from "./pages/creator/SentInvites";
import { useAppDispatch } from './store/hooks';
import { fetchUser, logOut } from "./store/slices/authSlice";
import { initPreferedColorScheme } from './store/slices/uiPreferencesSlice';

const router = createBrowserRouter([
    {
        Component: Layout,
        children: [
            {
                index: true,
                Component: Explore,
            },
            {
                path: '/my-plans',
                Component: MyPlans,
            },
            {
                path: '/creator',
                Component: CreatedPlans,
            },
            {
                path: '/sent-invites',
                Component: SentInvites,
            },
        ]
    },
]);

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
