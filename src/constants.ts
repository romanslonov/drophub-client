export const ENV = process.env.NODE_ENV;
export const ENV_PRODUCTION = ENV === 'production';
export const SITE_DOMAIN = process.env.VUE_APP_SITE_DOMAIN || 'https://drophub.com';
export const API_ROOT = ENV_PRODUCTION ? SITE_DOMAIN : 'http://localhost:3000';
