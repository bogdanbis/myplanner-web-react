import Api from './Api.ts';

const api = new Api({
	// @ts-ignore
	baseURL: import.meta.env.VITE_BASE_API_URL,
});

export default api;
