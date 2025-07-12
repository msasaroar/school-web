import { Injectable } from '@angular/core';
import { Class } from '@modules/class/models/class.model';
import { BaseHttpService } from '@core/services/base.http.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpPagedRequestOptions, HttpRequestOptions, KeyValuePair } from '@core/models/custom.data.types';
import { CREATE_CLASS, DELETE_CLASS_BY_ID, GET_CLASS_BY_ID, GET_CLASS_LIST, UPDATE_CLASS_BY_ID } from './class.service.endpoints';
import { Pagination } from '@core/models/pagination.model';

@Injectable({
    providedIn: 'root'
})
export class ClassService extends BaseHttpService {
    constructor(private http: HttpClient) {
        super(http);
    }

    getList(pagination: Partial<Pagination>, query?: string, countryId?: number): Observable<any> {
        const queryParams: KeyValuePair = {
            q: query,
            countryId: countryId
        };

        const options: HttpPagedRequestOptions = new HttpPagedRequestOptions({
            pagination: pagination as Pagination,
            skipPreloader: false,
            queryParams: queryParams
        });

        return this.get(GET_CLASS_LIST, options);
    }

    getById(id: number): Observable<any> {
        const options: HttpRequestOptions = new HttpRequestOptions({
            pathParams: { classId: id }
        });

        return this.get(GET_CLASS_BY_ID, options);
    }

    create(data: Class): Observable<any> {
        const options: HttpRequestOptions = new HttpRequestOptions({
            data: data,
            isMultipartFormData: false
        });

        return this.post(CREATE_CLASS, options);
    }

    update(data: Class): Observable<any> {
        const options: HttpRequestOptions = new HttpRequestOptions({
            data: data,
            pathParams: { classId: data.classId },
            isMultipartFormData: false
        });

        return this.put(UPDATE_CLASS_BY_ID, options);
    }

    deleteById(id: number): Observable<any> {
        const options: HttpRequestOptions = new HttpRequestOptions({
            pathParams: { classId: id }
        });

        return this.delete(DELETE_CLASS_BY_ID, options);
    }
}
