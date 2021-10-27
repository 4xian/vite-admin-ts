const getQueryStringByName = function (name: string) {
  var result = location.search.match(new RegExp('[?&]' + name + '=([^&]+)', 'i'))
  if (result == null || result.length < 1) {
    return ''
  }
  return result[1]
}

const transformData = function (data: any) {
  const params = new FormData()
  for (const item in data) {
    params.append(item, data[item])
  }
  return params
}

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

export { getQueryStringByName, transformData, DateFormat }

/* 对象转为params字符串拼接 */
export function objToParams(obj: any): string {
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
