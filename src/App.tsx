import { createBrowserRouter, RouterProvider } from "react-router";
import Layout from "./components/layout/Layout";
import Explore from "./pages/Explore";
import MyPlans from "./pages/MyPlans";
import CreatedPlans from "./pages/creator/CreatedPlans";
import SentInvites from "./pages/creator/SentInvites";

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
    return (
        <RouterProvider router={router} />
    )
}
