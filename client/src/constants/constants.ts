import { ValueOf } from '../utils';

export const COOKIES = {
  JWT_TOKEN: 'jwt'
} as const;

export const CookiesMap = COOKIES;

export type COOKIE = ValueOf<typeof COOKIES>;
