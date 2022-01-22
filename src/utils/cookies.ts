import Cookies from 'js-cookie'

// cookies
export function setCookie(key: string, data: string, isString = false) {
  return Cookies.set(key, isString ? JSON.stringify(data) : data)
}

export function getCookie(key: string, isParse = false) {
  return isParse ? JSON.parse(Cookies.get(key) as string) : Cookies.get(key)
}

export function removeCookie(key: string) {
  return Cookies.remove(key)
}

// localStorage

export function setLocalStorage(key: string, data: string) {
  return localStorage.setItem(key, data)
}

export function getLocalStorage(key: string) {
  return localStorage.getItem(key)
}

export function removeLocalStorage(key: string) {
  return localStorage.removeItem(key)
}

// sessionStorage
export function setSessionStorage(key: string, data: string) {
  return sessionStorage.setItem(key, data)
}

export function getSessionStorage(key: string) {
  return sessionStorage.getItem(key)
}

export function removeSessionStorage(key: string) {
  return sessionStorage.removeItem(key)
}
