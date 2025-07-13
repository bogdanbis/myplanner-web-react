import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchPublicPlans } from "@/store/slices/publicPlansSlice";
import PlansList from "./PlansList";

export default function PublicPlans() {
    const publicPlans = useAppSelector(state => state.publicPlans.publicPlans);
    const dispatch = useAppDispatch();

    if (publicPlans == null)
        dispatch(fetchPublicPlans());

    return (
        <PlansList plans={publicPlans || []} />
    )
}
