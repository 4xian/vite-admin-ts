const getQueryStringByName = function (name: string) {
  var result = location.search.match(new RegExp('[?&]' + name + '=([^&]+)', 'i'))
  if (result == null || result.length < 1) {
    return ''
  }
  return result[1]
}

// 转为图片上传formData格式
const transformData = function (data: any) {
  const params = new FormData()
  for (const item in data) {
    params.append(item, data[item])
  }
  return params
}

// 日期格式化
const DateFormat = function (date: any, fmt: string) {
  fmt = fmt || 'yyyy-MM-dd hh:mm:ss'
  if (date === null || typeof date === 'undefined' || date === '') {
    return null
  } else {
    // 时间要转成obj，否则报错
    date = new Date(date)
  }
  var o: any = {
    'M+': date.getMonth() + 1, // 月
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    S: date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return fmt
}

/* 对象转为params字符串拼接 */
export function objToParams<T>(obj: T): string {
  let url = ''
  for (const [key, val] of Object.entries(obj)) {
    url += `&${key}=${encodeURIComponent(val as any)}`
  }
  return url.replace(/&/, '?')
}

/* 扁平化对象 */
export const flatTree = (obj: any = {}, cid = 'children') => {
  if (!Array.isArray(obj[cid]) || obj[cid].length <= 0) {
    return obj
  }
  const temp: any[] = []
  const flat = (child: any) => {
    child[cid].forEach((v: any) => {
      if (Array.isArray(v[cid]) && v[cid].length > 0) {
        flat(v)
      }
      temp.push({ ...v, [cid]: null })
    })
  }
  flat(obj)
  return [...temp, { ...obj, [cid]: null }]
}

/* 扁平化数组 */
export const flatArray = (arr: any[] = [], cid = 'children') => {
  let result: any[] = []
  const nest = (v: any) => {
    if (v && v.length) {
      v.forEach((e: any) => {
        result = [...result, e]
        if (e[cid] && e[cid].length) {
          nest(e[cid])
        }
      })
    }
  }
  nest(arr)
  return result
}

/* 字符串格式化多分位 */
export const formatSeparator = (v: string, num = 3, flag = ',') => {
  return v.replace(new RegExp(`\\d{1,${num}}(?=(\\d{${num}})+$)`, 'g'), (i) => i + flag)
}

// 获取随机图片(w:宽 h:高 type: 'jpg' | 'webp')
export const getRandomImage = (w: string | number, h: string | number, type?: 'jpg' | 'webp') => {
  return `https://picsum.photos/${w}/${h}${type ? '.' : ''}${type}?random=${new Date().getTime()}`
}

/* 模拟sleep
    await sleepFn(1000)
*/
export const sleepFn = (t: number = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, t)
  })
}

export { getQueryStringByName, transformData, DateFormat }
