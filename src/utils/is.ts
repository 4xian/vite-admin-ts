export function isType(v: unknown, type: string) {
  return Object.prototype.toString.call(v) === `[object ${type}]`
}

export function isFunction(v: unknown) {
  return typeof v === 'function'
}

export function isString(v: unknown) {
  return isType(v, 'String')
}
