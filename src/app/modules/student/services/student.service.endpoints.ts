import { BASE_API_URL } from '@core/constants/constants';

export const BASE_STUDENT_URI = `${BASE_API_URL}/Student`;

export const GET_STUDENT_LIST = `${BASE_STUDENT_URI}`;
export const GET_STUDENT_BY_ID = `${BASE_STUDENT_URI}/{studentId}`;

export const CREATE_STUDENT = `${BASE_STUDENT_URI}`;
export const UPDATE_STUDENT_BY_ID = `${BASE_STUDENT_URI}/{studentId}`;
export const DELETE_STUDENT_BY_ID = `${BASE_STUDENT_URI}/{studentId}`;
