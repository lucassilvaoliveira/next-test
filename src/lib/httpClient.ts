import axios, { Axios, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export interface IHttpClient {
    get<T>(url: string, config?: AxiosRequestConfig): Promise<T>
    post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T>
    put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T>
    delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>
}

class AxiosHttpClient implements IHttpClient {

    private instance: AxiosInstance

    constructor(baseURL: string) {
        this.instance = axios.create({
            baseURL,
            headers: { 'Content-Type': 'application/json' }
        })
    }

    async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response : AxiosResponse<T> = await this.instance.get(url, config)
        return response.data
    }

    async post<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        const response : AxiosResponse<T> = await this.instance.post(url, data, config)
        return response.data
    }

    async put<T>(url: string, data: any, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.instance.put(url, data, config)
        return response.data
    }

    async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
       const response: AxiosResponse<T> = await this.instance.delete(url, config)
       return response.data
    }
}

export const httpClient: IHttpClient = new AxiosHttpClient('http://localhost:3000')