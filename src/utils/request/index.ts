import { Request } from './axios'
import { ContentTypeEnum, AxiosRequestOptions } from '#/request'

const initAxios = (opt?: Partial<AxiosRequestOptions>) => {
  return new Request({
    timeout: 10000,
    headers: {
      'Content-Type': ContentTypeEnum.JSON
    },
    initOptions: {
      prefix: ''
    },
    ...opt
  })
}

export const http = initAxios({
  initOptions: {
    prefix: ''
  }
})
