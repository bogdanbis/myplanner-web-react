import api from "@/api";
import { type IPlan } from "@/models/Plan";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { AppDispatch } from "../store";

interface PlansState {
    publicPlans: IPlan[] | null;
}

const publicPlansSlice = createSlice({
    name: 'plans',
    initialState: {
        publicPlans: null,
    },
    reducers: {
        setPublicPlans(state: PlansState, action: PayloadAction<IPlan[]>) {
            state.publicPlans = [...action.payload]
        }
    }
});

export const { setPublicPlans } = publicPlansSlice.actions;

export const fetchPublicPlans = () => async (dispatch: AppDispatch) => {
    const response: IPlan[] = await api.get('/plans/browse');
    dispatch(setPublicPlans(response));
}

export default publicPlansSlice.reducer;
