import api from "@/api";
import { type IPlan } from "@/models/Plan";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch, RootState } from "../store";
import type { IPlanProgress } from "@/models/PlanProgress";

interface PlansState {
    publicPlans: IPlan[] | null;
    acquiredPlans: IPlanProgress[] | null;
}

const initialState: PlansState = {
    publicPlans: null,
    acquiredPlans: null,
}

const plansSlice = createSlice({
    name: 'plans',
    initialState: initialState,
    reducers: {
        setPublicPlans(state: PlansState, action: PayloadAction<IPlan[]>) {
            state.publicPlans = [...action.payload]
        },
        setAcquiredPlans(state: PlansState, action: PayloadAction<IPlanProgress[]>) {
            state.acquiredPlans = [...action.payload]
        },
    }
});

export const { setPublicPlans, setAcquiredPlans } = plansSlice.actions;

export const fetchPublicPlans = () => async (dispatch: AppDispatch, getState: () => RootState) => {
    let publicPlans: IPlan[] = await api.get('/plans/browse');
    const acquiredPlans = getState().plans.acquiredPlans;
    if (acquiredPlans != null)
        publicPlans = publicPlans.map(p => {
            p.acquired = acquiredPlans.find((it: IPlanProgress) => it.plan.id === p.id);
            return p;
        })
    dispatch(setPublicPlans(publicPlans));
}

export const fetchAcquiredPlans = () => async (dispatch: AppDispatch) => {
    const acquiredPlans: IPlanProgress[] = await api.get('/plans/acquired');
    dispatch(setAcquiredPlans(acquiredPlans));
}

export default plansSlice.reducer;
