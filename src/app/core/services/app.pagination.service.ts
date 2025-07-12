import { Injectable } from '@angular/core';
import { Pagination } from '@core/models/pagination.model';

@Injectable({
    providedIn: 'root'
})
export class AppPaginationService {
    private paginationMap = new Map<string, any>();

    constructor() {}

    savePagination(pagination: Pagination, key: string) {
        this.paginationMap.set(key, pagination);
    }

    removePagination(key: string) {
        this.paginationMap.delete(key);
    }

    getPagination(key: string) {
        return this.paginationMap.get(key);
    }

    clearPagination() {
        this.paginationMap.clear();
    }

    clearPaginationExcluding(keysContainingToExclue: string[]) {
        // Get all the keys from paginationMap
        let mapKeys = Array.from(this.paginationMap.keys());

        // Get all the keys containing value form keysContainingToExclue to delete from paginationMap
        let deleteKeys = mapKeys.filter((item) => {
            return keysContainingToExclue.every((keyword) => {
                return !item.toLowerCase().includes(keyword.toLowerCase());
            });
        });

        // Delete all required keys from paginationMap
        deleteKeys.map((key) => {
            this.paginationMap.delete(key);
        });

        // console.log(keysContainingToExclue);
        // console.log('deleteData', deleteKeys);
        // console.log('keepData', Array.from(this.paginationMap.keys()));
    }

    getLastPagination(pagination: Pagination, keysContainingToExclue: string[] = []) {
        this.clearPaginationExcluding(keysContainingToExclue);
        const paginationTemp = this.getPagination(window.location.href);
        pagination = new Pagination({
            pageNumber: paginationTemp?.pageNumber,
            pageSize: paginationTemp?.pageSize
        });
    }

    overridePagination(pagination: Pagination, isInitialState: boolean): Pagination {
        if (isInitialState) {
            pagination.pageNumber = this.getPagination(window.location.href)?.pageNumber || pagination.pageNumber;
            pagination.pageSize = this.getPagination(window.location.href)?.pageSize || pagination.pageSize;
        }

        return pagination;
    }
}
