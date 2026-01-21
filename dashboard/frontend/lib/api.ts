import axios, { InternalAxiosRequestConfig } from 'axios';
import { getSession } from 'next-auth/react';

const api = axios.create({
    baseURL:'http://localhost:8000'
});

api.interceptors.request.use(async (config:InternalAxiosRequestConfig) => {
    const session = await getSession();
    if (session?.user?.email){
        config.headers.Authorization = `Bearer ${session.user.email}`;
    }
    return config;
});

export default api;