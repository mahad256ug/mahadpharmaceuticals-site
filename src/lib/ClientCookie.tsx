// utils/clientCookies.ts
import Cookies from "js-cookie";

export function getClientCookie(name: string): string | undefined {
  return Cookies.get(name);
}

export function setClientCookie(name: string, value: string, days = 1): void {
  Cookies.set(name, value, { expires: days, path: "/" });
}

export function deleteClientCookie(name: string): void {
  Cookies.remove(name, { path: "/" });
}
