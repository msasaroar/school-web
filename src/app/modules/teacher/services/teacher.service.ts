import { Injectable } from '@angular/core';
import { Teacher } from '@modules/teacher/models/teacher.model';
import { BaseHttpService } from '@core/services/base.http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpPagedRequestOptions, HttpRequestOptions, KeyValuePair } from '@core/models/custom.data.types';
import { CREATE_TEACHER, DELETE_TEACHER_BY_ID, GET_TEACHER_BY_ID, GET_TEACHER_LIST, UPDATE_TEACHER_BY_ID } from './teacher.service.endpoints';
import { Pagination } from '@core/models/pagination.model';

@Injectable({
    providedIn: 'root'
})
export class TeacherService extends BaseHttpService {
    constructor(private http: HttpClient) {
        super(http);
    }

    getList(pagination: Partial<Pagination>, query?: string, schoolId?: number): Observable<any> {
        const queryParams: KeyValuePair = {
            q: query,
            schoolId: schoolId
        };

        const options: HttpPagedRequestOptions = new HttpPagedRequestOptions({
            pagination: pagination as Pagination,
            skipPreloader: false,
            queryParams: queryParams
        });

        return this.get(GET_TEACHER_LIST, options);
    }

    getById(id: number): Observable<any> {
        const options: HttpRequestOptions = new HttpRequestOptions({
            pathParams: { teacherId: id }
        });

        return this.get(GET_TEACHER_BY_ID, options);
    }

    create(data: Teacher): Observable<any> {
        const options: HttpRequestOptions = new HttpRequestOptions({
            data: data,
            isMultipartFormData: false
        });

        return this.post(CREATE_TEACHER, options);
    }

    update(data: Teacher): Observable<any> {
        const options: HttpRequestOptions = new HttpRequestOptions({
            data: data,
            pathParams: { teacherId: data.teacherId },
            isMultipartFormData: false
        });

        return this.put(UPDATE_TEACHER_BY_ID, options);
    }

    deleteById(id: number): Observable<any> {
        const options: HttpRequestOptions = new HttpRequestOptions({
            pathParams: { teacherId: id }
        });

        return this.delete(DELETE_TEACHER_BY_ID, options);
    }
}
