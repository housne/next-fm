import { z } from "zod"

export type HTTPRequestConfig = RequestInit & {
  baseURL?: string
  query?: Record<string, string>
}

export class HTTP {
  constructor(private config?: HTTPRequestConfig) {}

  private get baseURL() {
    return this.config?.baseURL || ''
  }

  async request<T = any>(url: string, config: HTTPRequestConfig = {}, scheme?: z.ZodSchema<T>): Promise<T> {
    const { query, ...init} = config
    const baseRequestURL = /^https?:\/\//.test(url) ? url : `${this.baseURL}${url}`
    const requestQuery = config.query ? new URLSearchParams(config.query).toString() : ''
    const requestURL = `${baseRequestURL}${requestQuery ? '?' + requestQuery : ''}`
    const res = await fetch(
      requestURL, 
      { 
        ...init, 
        headers: {
          'Content-Type': 'application/json', 
          ...(init.headers || {}),
        }
      }
    )
    if (res.status >= 400) {
      return Promise.reject(res)
    }
    const data: T = await res.json()
    if (scheme) {
     const result = scheme.safeParse(data)
     if (!result.success) {
       return Promise.reject(result.error)
     }
    }
    return data
  }

  get<T = any>(url: string, config?: HTTPRequestConfig, scheme?: z.ZodSchema<T>) {
    return this.request(url, config, scheme)
  }

  post<T = any>(url: string, data?: any, config: HTTPRequestConfig = {}, scheme?: z.ZodSchema<T>) {
    const requestConfig: HTTPRequestConfig = {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...config
    }
    return this.request(url, requestConfig, scheme)
  }

  put<T = any>(url: string, data?: any, config: HTTPRequestConfig = {}, scheme?: z.ZodSchema<T>) {
    const requestConfig: HTTPRequestConfig = {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...config
    }
    return this.request(url, requestConfig, scheme)
  }
}

export const http = new HTTP({baseURL: '/api'})