import { Pagination } from '@core/models/pagination.model';

export type KeyValuePair = { [name: string | number]: string | number | any | undefined } | undefined | null;

export type HttpResponseType = 'arraybuffer' | 'blob' | 'json' | 'text' | any;

export class HttpRequestOptions {
    pathParams?: KeyValuePair;
    queryParams?: KeyValuePair;
    data?: any;
    headers?: KeyValuePair;
    skipPreloader?: boolean;
    isMultipartFormData?: boolean;
    isArrayBufferResponseType?: boolean;

    constructor(options: Partial<HttpRequestOptions>) {
        this.queryParams = options.queryParams || null;
        this.pathParams = options.pathParams || null;
        this.data = options.data || null;
        this.skipPreloader = options.skipPreloader || false;
        this.headers = options.headers || {};
        this.isMultipartFormData = options.isMultipartFormData || false;
        this.isArrayBufferResponseType = options.isArrayBufferResponseType || false;

        if (this.isMultipartFormData && this.data) {
            const formData = new FormData();

            // // Versioin 1
            // Object.keys(this.data).map((key) => {
            //     if (this.data[key]) {
            //         if (this.data[key] instanceof Array && this.data[key]?.length) {
            //             for (let item of this.data[key]) {
            //                 formData.append(key, item);
            //             }
            //         } else {
            //             formData.append(key, this.data[key]);
            //         }
            //     }
            // });

            // // Versioin 2
            // Object.keys(this.data).forEach((key) => {
            //     const value = this.data[key];
            //
            //     if (value === undefined || value === null) return;
            //
            //     if (Array.isArray(value)) {
            //         value.forEach((item: any, index: number) => {
            //             if (typeof item === 'object' && item !== null) {
            //                 // For array of objects - flatten using key[index].property
            //                 Object.keys(item).forEach((subKey) => {
            //                     const fullKey = `${key}[${index}].${subKey}`;
            //                     formData.append(fullKey, item[subKey]);
            //                 });
            //             } else {
            //                 // For array of primitives
            //                 formData.append(`${key}[${index}]`, item);
            //             }
            //         });
            //     } else if (typeof value === 'object' && !(value instanceof File)) {
            //         // Flatten single objects (if needed)
            //         Object.keys(value).forEach((subKey) => {
            //             const fullKey = `${key}.${subKey}`;
            //             formData.append(fullKey, value[subKey]);
            //         });
            //     } else {
            //         // Primitives or File
            //         formData.append(key, value);
            //     }
            // });

            // Versioin 3
            Object.keys(this.data).forEach((key) => {
                const value = this.data[key];

                if (value === undefined || value === null) return;

                // Handle arrays
                if (Array.isArray(value)) {
                    // If array contains File instances
                    if (value.length && value[0] instanceof File) {
                        value.forEach((file) => {
                            formData.append(key, file); // Keep same key for multiple files
                        });
                    }
                    // If array contains objects
                    else if (value.length && typeof value[0] === 'object' && value[0] !== null) {
                        value.forEach((item: any, index: number) => {
                            Object.keys(item).forEach((subKey) => {
                                const fullKey = `${key}[${index}].${subKey}`;
                                formData.append(fullKey, item[subKey]);
                            });
                        });
                    }
                    // If array contains primitives
                    else {
                        value.forEach((item: any, index: number) => {
                            formData.append(`${key}[${index}]`, item);
                        });
                    }
                }
                // Handle single object (excluding File)
                else if (typeof value === 'object' && !(value instanceof File)) {
                    Object.keys(value).forEach((subKey) => {
                        const fullKey = `${key}.${subKey}`;
                        formData.append(fullKey, value[subKey]);
                    });
                }
                // Handle primitive or single File
                else {
                    formData.append(key, value);
                }
            });


            this.data = formData;
        }
    }
}

export class HttpPagedRequestOptions extends HttpRequestOptions {
    pagination?: Pagination;

    constructor(options: Partial<HttpPagedRequestOptions>) {
        super(options);

        this.queryParams = { ...options.pagination, ...options.queryParams } as KeyValuePair;
    }
}
