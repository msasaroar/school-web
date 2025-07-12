import { BASE_API_URL } from '@core/constants/constants';

export const BASE_SCHOOL_URI = `${BASE_API_URL}/School`;

export const GET_SCHOOL_LIST = `${BASE_SCHOOL_URI}`;
export const GET_SCHOOL_BY_ID = `${BASE_SCHOOL_URI}/{schoolId}`;

export const CREATE_SCHOOL = `${BASE_SCHOOL_URI}`;
export const UPDATE_SCHOOL_BY_ID = `${BASE_SCHOOL_URI}/{schoolId}`;
export const DELETE_SCHOOL_BY_ID = `${BASE_SCHOOL_URI}/{schoolId}`;
