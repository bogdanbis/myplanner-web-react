import type { IPlan } from "@/models/Plan";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAcquiredPlans, fetchPublicPlans } from "@/store/slices/plansSlice";
import PublicPlanCard from "./PublicPlanCard";

export default function PublicPlans() {
    const user = useAppSelector(state => state.auth.user);
    const publicPlans = useAppSelector(state => state.plans.publicPlans);
    const dispatch = useAppDispatch();

    const fetchPlans = async () => {
        if (user != null)
            await dispatch(fetchAcquiredPlans());
        await dispatch(fetchPublicPlans());
    }

    if (publicPlans == null) {
        fetchPlans();
        return;
    }

    return publicPlans.map((plan: IPlan) =>
        <PublicPlanCard plan={plan} key={plan.id} />
    )
}
