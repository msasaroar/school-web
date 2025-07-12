import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpRequestOptions, HttpResponseType, KeyValuePair } from '@core/models/custom.data.types';
import { SKIP_PRELOADER_HEADER } from '@core/constants/constants';
import { inject } from '@angular/core';
import { DatePipe } from '@angular/common';

export class BaseHttpService {
    constructor(protected httpClient: HttpClient) {}

    protected get(url: string, requestOptions: HttpRequestOptions): Observable<any> {
        const generatedUrl: string = this.generateUrlWithPathParams(url, requestOptions.pathParams);
        const skipPreloaderHeader = requestOptions.skipPreloader ? SKIP_PRELOADER_HEADER : {};
        const headers = { ...requestOptions.headers, ...skipPreloaderHeader };
        const responseType: HttpResponseType = requestOptions.isArrayBufferResponseType ? 'blob' : 'json';

        if (requestOptions.queryParams) {
            requestOptions.queryParams = Object.fromEntries(Object.entries(requestOptions.queryParams).filter(([_, value]) => value !== undefined && value !== null && value !== ''));
        }

        const options: any = {
            params: requestOptions.queryParams,
            headers: headers,
            responseType: responseType
        };
        return this.httpClient.get(generatedUrl, options);
    }

    protected post(url: string, requestOptions: HttpRequestOptions): Observable<any> {
        const generatedUrl: string = this.generateUrlWithPathParams(url, requestOptions.pathParams);
        const skipPreloaderHeader = requestOptions.skipPreloader ? SKIP_PRELOADER_HEADER : {};
        const headers = { ...requestOptions.headers, ...skipPreloaderHeader };
        const responseType: HttpResponseType = requestOptions.isArrayBufferResponseType ? 'blob' : 'json';

        if (requestOptions.queryParams) {
            requestOptions.queryParams = Object.fromEntries(Object.entries(requestOptions.queryParams).filter(([_, value]) => value !== undefined && value !== null && value !== ''));
        }

        const options: any = {
            params: requestOptions.queryParams,
            headers: headers,
            responseType: responseType
        };
        return this.httpClient.post(generatedUrl, requestOptions.data, options);
    }

    protected put(url: string, requestOptions: HttpRequestOptions): Observable<any> {
        const generatedUrl: string = this.generateUrlWithPathParams(url, requestOptions.pathParams);
        const skipPreloaderHeader = requestOptions.skipPreloader ? SKIP_PRELOADER_HEADER : {};
        const headers = { ...requestOptions.headers, ...skipPreloaderHeader };
        const responseType: HttpResponseType = requestOptions.isArrayBufferResponseType ? 'blob' : 'json';

        if (requestOptions.queryParams) {
            requestOptions.queryParams = Object.fromEntries(Object.entries(requestOptions.queryParams).filter(([_, value]) => value !== undefined && value !== null && value !== ''));
        }

        const options: any = {
            params: requestOptions.queryParams,
            headers: headers,
            responseType: responseType
        };
        return this.httpClient.put(generatedUrl, requestOptions.data, options);
    }

    protected patch(url: string, requestOptions: HttpRequestOptions): Observable<any> {
        const generatedUrl: string = this.generateUrlWithPathParams(url, requestOptions.pathParams);
        const skipPreloaderHeader = requestOptions.skipPreloader ? SKIP_PRELOADER_HEADER : {};
        const headers = { ...requestOptions.headers, ...skipPreloaderHeader };
        const responseType: HttpResponseType = requestOptions.isArrayBufferResponseType ? 'blob' : 'json';

        if (requestOptions.queryParams) {
            requestOptions.queryParams = Object.fromEntries(Object.entries(requestOptions.queryParams).filter(([_, value]) => value !== undefined && value !== null && value !== ''));
        }

        const options: any = {
            params: requestOptions.queryParams,
            headers: headers,
            responseType: responseType
        };
        return this.httpClient.put(generatedUrl, requestOptions.data, options);
    }

    protected delete(url: string, requestOptions: HttpRequestOptions): Observable<any> {
        const generatedUrl: string = this.generateUrlWithPathParams(url, requestOptions.pathParams);
        const skipPreloaderHeader = requestOptions.skipPreloader ? SKIP_PRELOADER_HEADER : {};
        const headers = { ...requestOptions.headers, ...skipPreloaderHeader };
        const responseType: HttpResponseType = requestOptions.isArrayBufferResponseType ? 'blob' : 'json';

        if (requestOptions.queryParams) {
            requestOptions.queryParams = Object.fromEntries(Object.entries(requestOptions.queryParams).filter(([_, value]) => value !== undefined && value !== null && value !== ''));
        }

        const options: any = {
            params: requestOptions.queryParams,
            headers: headers,
            responseType: responseType
        };
        return this.httpClient.delete(generatedUrl, options);
    }

    /** Generated ready to use url with path params */
    generateUrlWithPathParams(url: string, pathParams?: KeyValuePair /* queryParams?: KeyValuePair */): string {
        // Replace path parameters in the URL
        if (pathParams) {
            for (const key in pathParams) {
                if (pathParams.hasOwnProperty(key)) {
                    const value = pathParams[key];
                    url = url.replace(`{${key}}`, value ? value.toString() : '0');
                }
            }
        }

        // // Append query parameters to the URL
        // if (queryParams) {
        //     const queryKeys = Object.keys(queryParams);
        //     if (queryKeys.length > 0) {
        //         const queryString = queryKeys
        //             .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
        //             .join("&");
        //         url += `?${queryString}`;
        //     }
        // }

        return url;
    }

    formatDateOnlyValueForBackend(date: any): any {
        // Handle null/undefined cases
        if (!date) return null;

        // Local date in yyyy-MM-dd format (avoids timezone issues)
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');

        return `${year}-${month}-${day}`;
    }
}
