import api from "@/api";
import PlanImages from "@/components/plans/PlanImages";
import MpButton from "@/components/ui/buttons/MpButton";
import MpCard from "@/components/ui/cards/MpCard";
import MpIcon from "@/components/ui/icons/MpIcon";
import MpBackLink from "@/components/ui/MpBackLink";
import MpMultilineText from "@/components/ui/MpMultilineText";
import Plan from "@/models/Plan";
import type { IPlanProgress } from "@/models/PlanProgress";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { requestLogIn } from "@/store/slices/authSlice";
import { acquirePlan, addAcquiredPlan, fetchAcquiredPlans, fetchPublicPlans } from "@/store/slices/plansSlice";
import store from "@/store/store";
import { useEffect, useState } from "react";
import { redirect, useNavigate, useParams } from "react-router";

export default function PlanPublicInfo() {
    const user = useAppSelector(state => state.auth.user);
    const publicPlans = useAppSelector(state => state.plans.publicPlans);
    const planId = useParams().id;
    const [busy, setBusy] = useState(false);
    const [plan, setPlan] = useState(new Plan());

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const init = async () => {
        if (user != null)
            await dispatch(fetchAcquiredPlans());
        if (publicPlans == null)
            await dispatch(fetchPublicPlans());
        // This is weird
        const planData = store.getState().plans.publicPlans!.find(it => it.id === planId);

        if (!planData)
            redirect('/');
        else if (planData.acquired)
            redirect('/my-plans/' + planData.acquired.id);

        setPlan(new Plan(planData));
    }

    useEffect(() => {
        init();
    }, [dispatch]);

    const onAcquirePlan = async () => {
        if (user == null)
            return dispatch(requestLogIn());
        setBusy(true);
        const planProgress = await dispatch(acquirePlan(plan.id!));
        navigate('/my-plans/' + planProgress.id);
    }

    return (
        <>
            <MpBackLink to="/">Explore</MpBackLink>

            <h2>{plan.title}</h2>
            <h5 className="page-subtitle">
                <MpIcon icon="person-fill" /> {plan.author.name}
            </h5>
            <p className="fw-600">{plan.shortDescription}</p>

            <MpButton onClick={onAcquirePlan} busy={busy} className="mb-m">
                Get
            </MpButton>
            <MpCard>
                <PlanImages
                    plan={plan}
                    className="mb-m"
                />
                <p>
                    <MpMultilineText text={plan.description} />
                    <br />
                    <span className="text-primary">Get this plan to view the entire description.</span>
                </p>
                {/* TODO <StepPublicInfo step={step} /> */}
                {plan.totalSteps != null && plan.totalSteps > 2 &&
                    <div>
                        <h6 className="m-0">{plan.totalSteps - 1} more steps available for participants.</h6>
                        <div className="mt-m">
                            <span className="text-primary">Get this plan to view the rest of the steps and keep track of your
                                progress.</span>
                            <MpButton
                                onClick={onAcquirePlan}
                                busy={busy}
                                className="mb-m"
                            >
                                Get
                            </MpButton>
                        </div>
                    </div>
                }
            </MpCard >
        </>
    )
}
