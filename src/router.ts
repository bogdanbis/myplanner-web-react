import Layout from "@/components/layout/Layout";
import CreatedPlans from "@/pages/creator/CreatedPlans";
import SentInvites from "@/pages/creator/SentInvites";
import Explore from "@/pages/Explore";
import MyPlans from "@/pages/MyPlans";
import PlanPublicInfo from "@/pages/PlanPublicInfo";
import { createBrowserRouter } from "react-router";
import PlanProgress from "./pages/participant/PlanProgress";

export const router = createBrowserRouter([
    {
        Component: Layout,
        children: [
            {
                index: true,
                Component: Explore,
            },
            {
                path: '/plan/:id',
                Component: PlanPublicInfo,
            },
            {
                path: '/my-plans',
                Component: MyPlans,
            },
            {
                path: '/my-plans/:id',
                Component: PlanProgress,
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
