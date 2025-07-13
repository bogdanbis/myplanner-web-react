import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import axios from 'axios';
import AuthService, { type SignUpParams } from './AuthService.ts';

export interface ApiParams extends AxiosRequestConfig {}

export default class Api {
    params: ApiParams;
    authService: AuthService;
    caller: AxiosInstance;

    constructor(params: ApiParams = {}) {
        const token = localStorage.getItem('token');
        if (token) {
            this.params = {
                ...params,
                headers: { ...params.headers, 'Authorization': 'Bearer ' + token },
            };
        } else {
            this.params = params;
        }
        this.caller = axios.create(this.params);
        this.authService = new AuthService(this);
    }

    async logIn(email: string, password: string): Promise<void> {
        const response = await this.authService.logIn(email, password);
        const params = {
            ...this.params,
            headers: { ...this.params.headers, 'Authorization': 'Bearer ' + response.token },
        };
        this.caller = axios.create(params);
    }

    async signUp(user: SignUpParams): Promise<void> {
        await this.authService.signUp(user);
        await this.logIn(user.email, user.password);
    }

    logOut(): void {
        this.authService.logOut();
        if (this.params.headers) {
            this.params.headers = undefined;
        }
        this.caller = axios.create(this.params);
    }

    async get<T = any>(resource: string, config?: AxiosRequestConfig, root = false): Promise<T> {
        return await this.caller
            .get(resource, config)
            .then(res => (root ? res : res.data));
    }

    async post<T = any>(resource: string, body?: any, config?: AxiosRequestConfig): Promise<T> {
        return await this.caller
            .post<T>(resource, body, config)
            .then(res => res.data);
    }

    async put<T = any>(resource: string, body?: any, config?: AxiosRequestConfig): Promise<T> {
        return await this.caller
            .put<T>(resource, body, config)
            .then(res => res.data);
    }

    async delete<T = any>(resource: string, config?: AxiosRequestConfig): Promise<T> {
        return await this.caller
            .delete<T>(resource, config)
            .then(res => res.data);
    }

    async upload<T = any>(resource: string, file: File, config: AxiosRequestConfig = {}): Promise<T> {
        const formData = new FormData();
        formData.append('file', file);
        let requestConfig: AxiosRequestConfig = { headers: { 'Content-Type': 'multipart/form-data' }, ...config };
        return await this.caller
            .post<T>(resource, formData, requestConfig)
            .then(res => res.data);
    }

    static errorTypes: Record<string, string> = {
        entity_not_found: 'Something was not found :(',
        user_not_found: 'An account with this email does not exist.',
        email_used: 'An account with this email already exists.',
    };
}
