import { http } from '@/utils/request/index'
import { Response, ContentTypeEnum } from '#/request'
const prefix = ''
enum Api {
  UPLOAD = '/api/file/upload'
}
// 上传图片
export const uploadImg = (data: FormData, params?: any) => {
  return http.post<Response<FileType[]>>({
    url: Api.UPLOAD,
    headers: {
      'Content-Type': ContentTypeEnum.FORM_DATA
    },
    params,
    data
  })
}
