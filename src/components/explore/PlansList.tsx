import type Plan from "@/models/Plan";
import MpCard from "../ui/cards/MpCard";
import MpCardActions from "../ui/cards/MpCardActions";
import MpIcon from "../ui/icons/MpIcon";
import MpLink from "../ui/MpLink";

interface PlansListProps {
    plans: Plan[];
}

function NumberOfParticipants({ count }: { count: number | undefined }) {
    return count
        ? count + (count === 1 ? ' participant' : ' participants')
        : 'No participants'
}

export default function PlansList({ plans }: PlansListProps) {
    return plans.map(plan => (
        <MpCard title={plan.title} key={plan.id}>
            <div className="mp-card-subtitle">
                <div>
                    <MpIcon icon="person-fill" /> {plan.author.name}
                </div>
                <br />
                <NumberOfParticipants count={plan.numberOfParticipants} />
            </div>
            <span className="text-secondary">{plan.shortDescription}</span>
            <MpCardActions>
                <div>
                    <MpLink to={'/plan/' + plan.id}>Details</MpLink>
                </div>
            </MpCardActions>
        </MpCard>
    ));
}
