import type { IPlanProgress } from "@/models/PlanProgress";
import MpCard from "../ui/cards/MpCard";
import MpCardActions from "../ui/cards/MpCardActions";
import MpIcon from "../ui/icons/MpIcon";
import MpLink from "../ui/MpLink";
import MpMultilineText from "../ui/MpMultilineText";

interface AcquiredPlanCardProps {
	planProgress: IPlanProgress;
}

export default function AcquiredPlanCard({ planProgress }: AcquiredPlanCardProps) {
	return (
		<MpCard title={planProgress.plan.title}>
			<span className="mp-card-subtitle">
				<MpIcon icon="person-fill" />
				{planProgress.plan.author.name}
			</span>
			<MpMultilineText text={planProgress.plan.shortDescription} className="text-secondary" />
			<MpCardActions>
				<MpLink to={'/my-plans/' + planProgress.id}>View progress</MpLink>
			</MpCardActions>
		</MpCard>
    )
}
