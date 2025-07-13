export default class AuthService {
	api;

	constructor(api) {
		this.api = api;
	}

	async logIn(email, password) {
		localStorage.removeItem('token');
		const response = await this.api.post('/login', { email, password });
		localStorage.setItem('token', response.token);
		return response;
	}

	async signUp({ email, firstName, lastName, password }) {
		await this.api.post('/signup', { email, firstName, lastName, password });
	}

	logOut() {
		localStorage.removeItem('token');
	}
}
