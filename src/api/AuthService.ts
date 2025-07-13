import type Api from "./Api";

export interface SignUpParams {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
}

export default class AuthService {
	api: Api;

	constructor(api: Api) {
		this.api = api;
	}

	async logIn(email: string, password: string): Promise<{ token: string }> {
		localStorage.removeItem('token');
		const response = await this.api.post('/login', { email, password });
		localStorage.setItem('token', response.token);
		return response;
	}

	async signUp({ email, firstName, lastName, password }: SignUpParams): Promise<void> {
		await this.api.post('/signup', { email, firstName, lastName, password });
	}

	logOut(): void {
		localStorage.removeItem('token');
	}
}
