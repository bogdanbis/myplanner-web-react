import axios from 'axios';
import AuthService from './AuthService.ts';

export default class Api {
	params = {};
	authService = new AuthService(this);

	constructor(params) {
		const token = localStorage.getItem('token');
		if (token) {
			this.params = {
				...params,
				headers: { 'Authorization': 'Bearer ' + token },
			}
		} else {
			this.params = params;
		}
		this.caller = axios.create(this.params);
	}

	async logIn(email, password) {
		const response = await this.authService.logIn(email, password);
		const params = {
			...this.params,
			headers: { 'Authorization': 'Bearer ' + response.token },
		};
		this.caller = axios.create(params);
	}

	async signUp(user) {
		await this.authService.signUp(user);
		await this.logIn(user.email, user.password);
	}

	logOut() {
		this.authService.logOut();
		this.params.headers = null;
		this.caller = axios.create(this.params);
	}

	async get(resource, config = undefined, root = false) {
		return await this.caller
				.get(resource, config)
				.then(res => root ? res : res.data);
	}

	async post(resource, body = undefined, config = undefined) {
		return await this.caller
				.post(resource, body, config)
				.then(res => res.data);
	}

	async put(resource, body = undefined, config = undefined) {
		return await this.caller
				.put(resource, body, config)
				.then(res => res.data);
	}

	async delete(resource, config = undefined) {
		return await this.caller
				.delete(resource, config)
				.then(res => res.data);
	}

	async upload(resource, file, config = {}) {
		const formData = new FormData();
		formData.append('file', file);
		let requestConfig = { headers: { 'Content-Type': 'multipart/form-data' }, ...config }
		return await this.caller
				.post(resource, formData, requestConfig)
				.then(res => res.data);
	}

	static errorTypes = {
		entity_not_found: 'Something was not found :(',
		user_not_found: 'An account with this email does not exist.',
		email_used: 'An account with this email already exists.',
	}

}
