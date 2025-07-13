import { BASE_API_URL } from '@core/constants/constants';

export const BASE_TEACHER_URI = `${BASE_API_URL}/Teacher`;

export const GET_TEACHER_LIST = `${BASE_TEACHER_URI}`;
export const GET_TEACHER_BY_ID = `${BASE_TEACHER_URI}/{teacherId}`;

export const CREATE_TEACHER = `${BASE_TEACHER_URI}`;
export const UPDATE_TEACHER_BY_ID = `${BASE_TEACHER_URI}/{teacherId}`;
export const DELETE_TEACHER_BY_ID = `${BASE_TEACHER_URI}/{teacherId}`;
