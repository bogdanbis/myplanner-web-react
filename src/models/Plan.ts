import api from '@/api/index.js';
import { sanitize } from '@/utils/sanitize.ts';
import ApplicationUser from './ApplicationUser.js';
import Step from './Step.ts';

export interface IPlan {
	id?: string;
	title?: string;
	shortDescription?: string;
	description?: string;
	color: string;
	isPublic: boolean;
	createdAt?: string;
	lastModifiedAt?: string;
	numberOfParticipants?: number;
	author: ApplicationUser;
	images: any[];
	steps: Step[];
	totalSteps?: number;
	stats: {
		numberOfParticipants: number | null;
		completedStepsCount: number | null;
	};
	acquired: boolean;
}

export default class Plan implements IPlan {
	id?: string;
	title?: string;
	shortDescription?: string;
	description?: string;
	color: string = '#5856D6';
	isPublic: boolean = false;
	createdAt?: string;
	lastModifiedAt?: string;
	numberOfParticipants?: number;
	author = new ApplicationUser();
	images: any[] = [];
	steps: Step[] = [];
	totalSteps?: number;
	stats = {
		numberOfParticipants: null,
		completedStepsCount: null,
	};
	acquired: boolean = false;

	constructor(plan: any) {
		if (!plan) return;
		this.init(plan);
	}

	init(plan: any) {
		this.id = plan.id;
		this.title = plan.title;
		this.shortDescription = plan.shortDescription;
		this.description = plan.description;
		this.color = plan.color;
		this.isPublic = plan.isPublic;
		this.createdAt = plan.createdAt;
		this.lastModifiedAt = plan.lastModifiedAt;
		this.numberOfParticipants = plan.numberOfParticipants;
		this.author = new ApplicationUser(plan.author);
		this.images = plan.images.map((img: { id: any; }) => ({
			...img,
			src: `${api.params.baseURL}/images/${img.id}`,
		}));
		this.steps = plan.steps?.map((t: any) => new Step(t)) || [];
		this.totalSteps = plan.totalSteps;
		if (plan.stats) {
			this.stats = {
				numberOfParticipants: plan.stats.numberOfParticipants,
				completedStepsCount: plan.stats.completedStepsCount,
			};
		}
		this.sanitize();
	}

	async update(plan: Plan) {
		const request = new Plan(plan);
		request.sanitize();
		const response = await api.put('/plans/' + this.id, request);
		this.init(response);
	}

	async uploadImage(file: string | Blob) {
		const requestBody = new FormData();
		requestBody.set('photo', file);
		const image = await api.post(`/plans/created/${this.id}/images`, requestBody);
		image.src = `${api.params.baseURL}/images/${image.id}`;
		this.images.push(image);
		return image;
	}

	async deleteImage(image: { id: any; }) {
		await api.delete(`/plans/created/${this.id}/images/${image.id}`);
		const idx = this.images.findIndex(it => it.id === image.id);
		if (idx >= 0)
			this.images.splice(idx, 1);
	}

	sanitize() {
		this.title = sanitize(this.title);
		this.shortDescription = sanitize(this.shortDescription);
		this.description = sanitize(this.description);
	}
}
