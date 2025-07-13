import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Pagination } from '@core/models/pagination.model';
import { AppTitleService } from '@core/services/app.title.service';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { TableLazyLoadEvent } from 'primeng/table';
import { environment } from '@environments/environment';

@Component({
    selector: 'app-base',
    template: ``
})
export class BaseComponent implements OnDestroy {
    pageHeader: string = '';
    // public currentDate: Date = new Date();
    public baseFileUrl = environment.baseFileUrl; // + "/";

    private subscriptionsArray: Subscription[] = [];

    constructor(
        protected ttlService: AppTitleService,
        protected aRoute: ActivatedRoute
    ) {
        this.pageHeader = this.aRoute.snapshot.data['title'];
        this.ttlService.setTitle(this.aRoute.snapshot.data);
    }

    ngOnDestroy(): void {
        this.ttlService.resetTitle();
        this.unsubscribeAllSubscriptions(this.subscriptionsArray);
    }

    /**
     * Always set subscription for calling of any method which have been subscribed.
     * @param {Subscription} subscription - Set method for subscription.
     */
    set subscriptions(subscription: Subscription) {
        try {
            if (this.subscriptionsArray && this.subscriptionsArray.length >= 0) {
                if (subscription) {
                    this.subscriptionsArray.push(subscription);
                }
            } else {
                this.subscriptionsArray = [];
                if (subscription) {
                    this.subscriptionsArray.push(subscription);
                }
            }
        } catch (error) {}
    }

    /**
     * Call this method to unsubscribe all subscriptions if child of this component implements OnDestroy.
     * Or just call super.ngOnDestroy() in own ngOnDestroy() method.
     * @param {Subscription[]} subscriptions - Array of all subscriptions
     */
    unsubscribeAllSubscriptions(subscriptions: Subscription[]) {
        subscriptions.forEach((subscription: Subscription) => {
            try {
                if (!subscription.closed) {
                    subscription.unsubscribe();
                }
            } catch (error) {
                console.log(error);
            }
        });
    }

    isDifferentTablePage(event: TableLazyLoadEvent, pagination: Pagination): boolean {
        /* let eventSample: LazyLoadEvent = {
          "first": 5,
          "rows": 5,
          "sortOrder": 1,
          "filters": {},
          "globalFilter": null
        }; */

        const pageNumber = (event.first ?? 0) / (event.rows ?? 0) + 1;
        const pageSize = event.rows;

        if (pagination.pageNumber == pageNumber && pagination.pageSize == pageSize) {
            return false;
        } else {
            return true;
        }
    }

    setupPagination(event: TableLazyLoadEvent, pagination: Pagination): Pagination {
        /* let eventSample: LazyLoadEvent = {
          "first": 5,
          "rows": 5,
          "sortOrder": 1,
          "filters": {},
          "globalFilter": null
        }; */

        pagination = new Pagination({
            first: event?.first || 0,
            rows: event?.rows || 0
        });

        console.log(pagination);

        return pagination;
    }

    public markFormGroupAsTouched(formGroup?: FormGroup): void {
        if (!formGroup) return;
        Object.keys(formGroup.controls).forEach((field) => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
                control.markAsDirty({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.markFormGroupAsTouched(control);
            } else if (control instanceof FormArray) {
                for (const item of control.controls) {
                    this.markFormGroupAsTouched(item as FormGroup);
                }
            }
        });

        console.log(formGroup);
    }

    public markFormGroupAsUnTouched(formGroup?: FormGroup): void {
        if (!formGroup) return;

        this.logFormErrors(formGroup);

        formGroup.reset();
        Object.keys(formGroup.controls).forEach((field) => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsUntouched({ onlySelf: true });
                control.markAsPristine({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.markFormGroupAsUnTouched(control);
            } else if (control instanceof FormArray) {
                for (const item of control.controls) {
                    this.markFormGroupAsUnTouched(item as FormGroup);
                }
            }
        });

        console.log(formGroup);
    }

    public logFormErrors(control: AbstractControl, path: string = ''): void {
        if (control instanceof FormGroup) {
            Object.keys(control.controls).forEach((key) => {
                const childPath = path ? `${path}.${key}` : key;
                this.logFormErrors(control.controls[key], childPath);
            });
        } else if (control instanceof FormArray) {
            control.controls.forEach((ctrl, index) => {
                const childPath = `${path}[${index}]`;
                this.logFormErrors(ctrl, childPath);
            });
        } else {
            if (control.errors) {
                console.error(`❌ Error in '${path}':`, control.errors);
            }
        }
    }

    public getFileUrl(base64String?: string) {
        return `${environment.baseFileUrl}/${base64String}`;
    }

    public getFileName(base64String?: string) {
        base64String = base64String || '';
        return atob(base64String).split('#').pop();
    }

    arraysEqual(arr1?: any[], arr2?: any[]): boolean {
        arr1 = arr1 || [];
        arr2 = arr2 || [];

        if (arr1.length !== arr2.length) return false;

        const getKey = (item: any) => (typeof item === 'object' ? JSON.stringify(item) : item);

        const countMap = new Map<string, number>();

        arr1.forEach((item) => {
            const key = getKey(item);
            countMap.set(key, (countMap.get(key) || 0) + 1);
        });

        arr2.forEach((item) => {
            const key = getKey(item);
            if (!countMap.has(key)) return;
            countMap.set(key, countMap.get(key)! - 1);
        });

        return [...countMap.values()].every((count) => count === 0);
    }
}
