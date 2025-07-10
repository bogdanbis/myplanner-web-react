import { createBrowserRouter, RouterProvider } from "react-router";
import { useEffect } from 'react';
import Layout from "./components/layout/Layout";
import Explore from "./pages/Explore";
import MyPlans from "./pages/MyPlans";
import CreatedPlans from "./pages/creator/CreatedPlans";
import SentInvites from "./pages/creator/SentInvites";
import { useAppDispatch } from './store/hooks';
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

    useEffect(() => {
        dispatch(initPreferedColorScheme());
    }, [dispatch]);

    return (
        <RouterProvider router={router} />
    )
}
