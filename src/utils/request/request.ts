import axios from 'axios'
import type { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'
import { message } from 'ant-design-vue'
import { getCookie, removeCookie } from '../cookies'

const baseURL = ''

const service = axios.create({
  baseURL,
  timeout: 10000
})

service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    /* 请求拦截的信息配置等 */
    const token = getCookie('token')
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  (err: AxiosError) => Promise.reject(err)
)

service.interceptors.response.use(
  (res: AxiosResponse) => {
    return res.data
  },
  (err: AxiosError) => {
    if (err.response) {
      removeCookie('token')
      //   location.reload();
    }
    message.error(err.message)
    return Promise.reject(err)
  }
)
export default service
