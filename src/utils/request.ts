import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import userStore from '@/stores/user'

const service: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5173/api',
})
export const request = {
  get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return service.get(url, config)
  },

  post<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return service.post(url, data, config)
  },

  put<T = any>(url: string, data?: object, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return service.put(url, data, config)
  },

  delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return service.delete(url, config)
  },
}
// 设置请求拦截器
service.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  const useUserStore = userStore()
  const token = useUserStore.token
  if (token)
    config.headers.token = token
  // config是请求的配置信息，我们可以自定义的附带一些参数在请求头，比如说token啊，cookies啊
  // 这些东西是很常用的，也就是说我们设置了拦截器的话，每次请求前都会做这么一件事

  return config
}, (error) => {
  // 对请求错误做些什么
  return Promise.reject(error)
})
// 设置响应拦截器
// service.interceptors.response.use((response) => {
//   // 对响应数据做点什么
//   return response
// })
