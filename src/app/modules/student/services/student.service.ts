import { Injectable } from '@angular/core';
import { Student } from '@modules/student/models/student.model';
import { BaseHttpService } from '@core/services/base.http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpPagedRequestOptions, HttpRequestOptions, KeyValuePair } from '@core/models/custom.data.types';
import { CREATE_STUDENT, DELETE_STUDENT_BY_ID, GET_STUDENT_BY_ID, GET_STUDENT_LIST, UPDATE_STUDENT_BY_ID } from './student.service.endpoints';
import { Pagination } from '@core/models/pagination.model';

@Injectable({
    providedIn: 'root'
})
export class StudentService extends BaseHttpService {
    constructor(private http: HttpClient) {
        super(http);
    }

    getList(pagination: Partial<Pagination>, query?: string, schoolId?: number, classId?: number): Observable<any> {
        const queryParams: KeyValuePair = {
            q: query,
            schoolId: schoolId,
            classId: classId,
        };

        const options: HttpPagedRequestOptions = new HttpPagedRequestOptions({
            pagination: pagination as Pagination,
            skipPreloader: false,
            queryParams: queryParams
        });

        return this.get(GET_STUDENT_LIST, options);
    }

    getById(id: number): Observable<any> {
        const options: HttpRequestOptions = new HttpRequestOptions({
            pathParams: { studentId: id }
        });

        return this.get(GET_STUDENT_BY_ID, options);
    }

    create(data: Student): Observable<any> {
        const options: HttpRequestOptions = new HttpRequestOptions({
            data: data,
            isMultipartFormData: false
        });

        return this.post(CREATE_STUDENT, options);
    }

    update(data: Student): Observable<any> {
        const options: HttpRequestOptions = new HttpRequestOptions({
            data: data,
            pathParams: { studentId: data.studentId },
            isMultipartFormData: false
        });

        return this.put(UPDATE_STUDENT_BY_ID, options);
    }

    deleteById(id: number): Observable<any> {
        const options: HttpRequestOptions = new HttpRequestOptions({
            pathParams: { studentId: id }
        });

        return this.delete(DELETE_STUDENT_BY_ID, options);
    }
}
