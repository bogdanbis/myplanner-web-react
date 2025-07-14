import type { IApplicationUser } from "./ApplicationUser";
import type { IPlan } from "./Plan";

export interface IPlanProgress {
    id: string;
	plan: IPlan;
	participant: IApplicationUser;
	acquiredAt: string;
	lastSyncedPlan: string;
	lastActive?: string | null;
	comment?: string | null;
}
