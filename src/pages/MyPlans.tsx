import LogIn from "@/components/auth/LogIn";
import AcquiredPlanCard from "@/components/plans/AcquiredPlanCard";
import type { IPlanProgress } from "@/models/PlanProgress";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchAcquiredPlans } from "@/store/slices/plansSlice";

export default function PlanProgress() {
    const user = useAppSelector(state => state.auth.user);
    if (user == null)
        return <>
            <span>We don't know who you are. 🧐<br />
                Log in to see your plans.</span>
            <LogIn redirect-to="/my-plans" className="mt-l" />
        </>

    const dispatch = useAppDispatch();
    const acquiredPlans = useAppSelector(state => state.plans.acquiredPlans);

    if (acquiredPlans == null)
        dispatch(fetchAcquiredPlans());

    return <>
        <h2>Plan Progress</h2>
        <span className="page-subtitle">The plans you got from other creators.</span>

        {acquiredPlans?.map((plan: IPlanProgress) =>
            <AcquiredPlanCard planProgress={plan} key={plan.id} />)}
    </>
}
