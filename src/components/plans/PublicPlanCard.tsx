import type { IPlan } from "@/models/Plan";
import MpCard from "../ui/cards/MpCard";
import MpCardActions from "../ui/cards/MpCardActions";
import MpIcon from "../ui/icons/MpIcon";
import MpLink from "../ui/MpLink";

interface PlansListProps {
    plan: IPlan;
}

function NumberOfParticipants({ count }: { count: number | undefined }) {
    return count
        ? count + (count === 1 ? ' participant' : ' participants')
        : 'No participants'
}

export default function PublicPlanCard({ plan }: PlansListProps) {
    return (
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
                    {plan.acquired == null
                        ? <MpLink to={'/plan/' + plan.id}>Details</MpLink>
                        : <MpLink to={'/my-plans/' + plan.acquired.id} className="text-primary">
                            You have this plan
                            <MpIcon icon="check-lg" />
                        </MpLink>
                    }
                </div>
            </MpCardActions>
        </MpCard>
    )
}
