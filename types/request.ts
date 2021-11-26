// / reference
import { AxiosRequestConfig } from 'axios'

export interface ReqOptions {
  prefix?: string
  apiUrl?: string
}
export interface AxiosRequestOptions extends AxiosRequestConfig {
  initOptions?: ReqOptions
}

export interface Response<T = any> {
  code: number
  message: string
  data: T
}

export enum RequestTypeEnum {
  GET = 'get',
  POST = 'post',
  PUT = 'put',
  DELETE = 'delete'
}

export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data
  WWW_FORM = 'application/x-www-form-urlencoded;charset=UTF-8',
  // from-data upload
  FORM_DATA = 'application/form-data;charset=UTF-8'
}
