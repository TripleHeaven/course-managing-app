import { ValueOf } from '../../utils/valueOf';

export const ROUTES = {
  LOGIN: '/login',
  RESET_PASSWORD: '/reset-password',
  ROOT: '/',
  REGISTER: '/register'
} as const;

export const RouteMap = ROUTES;

export type ROUTE = ValueOf<typeof ROUTES>;
