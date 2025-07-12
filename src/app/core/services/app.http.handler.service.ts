import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AppToasterService } from '@core/services/app.toaster.service';
import { PreloaderService } from '@core/components/preloader/services/preloader.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class AppHttpHandlerService {
    constructor(
        private toasterService: AppToasterService,
        private router: Router,
        private location2: Location,
        private preloaderService: PreloaderService
    ) {}

    handleHttpErrorResponse(response: HttpErrorResponse) {
        switch (response.status) {
            case 400:
                let errorMessage: string;
                if (response.error?.message) {
                    errorMessage = response.error?.message;
                } else if (response?.error?.errors) {
                    //For showing model validation error messages
                    errorMessage = this.processModelValidationErrorMessages(response);
                } else if (response?.error?.warning) {
                    //For showing warning messages through 400 status
                    errorMessage = response?.error?.warning;
                } else if (response?.error?.info) {
                    //For showing info messages through 400 status
                    errorMessage = response?.error?.info;
                } else if (response.error?.error) {
                    //For showing error messages through 400 status
                    errorMessage = response?.error?.error;
                } else {
                    //For showing unknown error through 400 status
                    errorMessage = `Bad Request!`;
                }

                if (errorMessage) this.toasterService.showError(errorMessage);
                break;
            case 500:
                this.toasterService.showError(response.error?.message || `Internal Server Error!`);
                break;
            case 401:
                this.toasterService.showError(response.error?.message || `Unauthorized Request!`);
                break;
            case 403:
                this.router.navigate(['/accessdenied'], { replaceUrl: true }).then();
                this.toasterService.showError(response.error?.message || `Forbidden Request!`);
                break;
            case 404:
                this.toasterService.showError(response.error?.message || `Not Found!`);
                break;
            case 204:
                this.toasterService.showError(response.error?.message || `No Content!`);
                break;
            case 0:
                this.toasterService.showError(response.error?.message || `Could not connect to the Server!`);
                break;
            default:
                this.preloaderService.resetSpinner();
                this.toasterService.showError(`Unknown Error!`);
                break;
        }
    }

    private processModelValidationErrorMessages(error: HttpErrorResponse) {
        const errors = error?.error?.errors || {};
        let errorMessages = '';
        let count = 0;
        Object.keys(errors).map((key: string) => {
            for (const errorMessage of errors[key]) {
                errorMessages = errorMessages.concat(++count + ') ' + errorMessage + '\n');
            }
        });
        return errorMessages;
    }
}
