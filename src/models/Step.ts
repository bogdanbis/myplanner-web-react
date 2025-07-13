import { sanitize } from '@/utils/sanitize.ts';

export default class Step {
	id?: string;
	title?: string;
	description?: string;
	index?: number;
	steps: Step[] = [];

	constructor(step: any) {
		if (!step) return;
		this.id = step.id;
		this.title = step.title;
		this.description = step.description;
		this.index = step.index;
		this.steps = step.steps?.map((s: Step) => new Step(s)) || [];
		this.sanitize();
	}

	sanitize() {
		this.title = sanitize(this.title);
		this.description = sanitize(this.description);
	}
}
