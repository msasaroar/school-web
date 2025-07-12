import { Injectable } from '@angular/core';
import { School } from '@modules/school/models/school.model';
import { BaseHttpService } from '@core/services/base.http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpPagedRequestOptions, HttpRequestOptions, KeyValuePair } from '@core/models/custom.data.types';
import { CREATE_SCHOOL, DELETE_SCHOOL_BY_ID, GET_SCHOOL_BY_ID, GET_SCHOOL_LIST, UPDATE_SCHOOL_BY_ID } from '@modules/school/services/school.service.endpoints';
import { Pagination } from '@core/models/pagination.model';

@Injectable({
    providedIn: 'root'
})
export class SchoolService extends BaseHttpService {
    constructor(private http: HttpClient) {
        super(http);
    }

    getList(pagination: Partial<Pagination>, query?: string): Observable<any> {
        const queryParams: KeyValuePair = {
            q: query
        };

        const options: HttpPagedRequestOptions = new HttpPagedRequestOptions({
            pagination: pagination as Pagination,
            skipPreloader: false,
            queryParams: queryParams
        });

        return this.get(GET_SCHOOL_LIST, options);
    }

    getById(id: number): Observable<any> {
        const options: HttpRequestOptions = new HttpRequestOptions({
            pathParams: { schoolId: id }
        });

        return this.get(GET_SCHOOL_BY_ID, options);
    }

    create(data: School): Observable<any> {
        const options: HttpRequestOptions = new HttpRequestOptions({
            data: data,
            isMultipartFormData: false
        });

        return this.post(CREATE_SCHOOL, options);
    }

    update(data: School): Observable<any> {
        const options: HttpRequestOptions = new HttpRequestOptions({
            data: data,
            pathParams: { schoolId: data.schoolId },
            isMultipartFormData: false
        });

        return this.put(UPDATE_SCHOOL_BY_ID, options);
    }

    deleteById(id: number): Observable<any> {
        const options: HttpRequestOptions = new HttpRequestOptions({
            pathParams: { schoolId: id }
        });

        return this.delete(DELETE_SCHOOL_BY_ID, options);
    }
}
