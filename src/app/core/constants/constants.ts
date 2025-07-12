import { environment } from '@environments/environment';

const baseUrl = [
    environment.baseApiUrl, // For production builds
    'https://localhost:5010/api', // For development
    'https://10.192.168.91:5001' // For development
];

export const BASE_API_URL = `${baseUrl[0]}`;

export const LOGIN_ROUTE: string = '/auth/login';

export const EMAIL_REGEX: string = `([a-zA-Z0-9_.]{1}[a-zA-Z0-9_.]*)((@[a-zA-Z]{2}[a-zA-Z]*)[\\\.]([a-zA-Z]{2}|[a-zA-Z]{3}))`;

// export const EMAIL_REGEX: string = new RegExp(/^(([^^!*,<>()\[\]\\.;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

// ^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$
// export const EMAIL_REGEX: string = `^[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$`;

export const DATE_FORMAT = 'dd-mm-yy';

export const SKIP_PRELOADER_HEADER_NAME = 'skip-preloader';
export const SKIP_PRELOADER_HEADER = { 'skip-preloader': 'true' }; // user this at http request header for skipping preloader

export const MSG_FOR_LOGIN_PAGE = 'Your session is expired. Please, login again.';

export const MAX_FILE_SIZE = 1073741824;

export const SHOW_TABLE_SEARCH_BAR = true;
export const IS_COLOR_SCHEME_CHANGEABLE = false;

export const USER_ROLES: string[] = [];

export const TOKEN_HEADER_KEY = 'Authorization';
export const PORTAL_NAME_HEADER_KEY = 'X-PORTAL-NAME';
export const CLIENT_ID = environment.clientId;
export const CLIENT_SECRET = environment.clientSecret;
