import { BASE_API_URL } from '@core/constants/constants';

export const BASE_CLASS_URI = `${BASE_API_URL}/Class`;

export const GET_CLASS_LIST = `${BASE_CLASS_URI}`;
export const GET_CLASS_BY_ID = `${BASE_CLASS_URI}/{classId}`;

export const CREATE_CLASS = `${BASE_CLASS_URI}`;
export const UPDATE_CLASS_BY_ID = `${BASE_CLASS_URI}/{classId}`;
export const DELETE_CLASS_BY_ID = `${BASE_CLASS_URI}/{classId}`;
