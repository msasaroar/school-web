import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AppCommonService } from '@core/services/app.common.service';

@Injectable({
    providedIn: 'root'
})
export class AppToasterService {
    private messageLifeTimeInMs: number = 7000; // in millisecond

    private messageStack: string[] = [];

    constructor(
        private messageService: MessageService,
        private commonService: AppCommonService
    ) {}

    //region Temporary Messages
    showSuccess(message: string, header?: string) {
        if (!this.checkMessageInStack(message)) {
            this.messageService.add({
                severity: 'success',
                summary: header ? header : 'Success',
                detail: message,
                life: this.messageLifeTimeInMs
            });
            this.removeFromStackAfterLifeTime(message);
        }
    }

    showInfo(message: string, header?: string) {
        if (!this.checkMessageInStack(message)) {
            this.messageService.add({
                severity: 'info',
                summary: header ? header : 'Information',
                detail: message,
                life: this.messageLifeTimeInMs
            });
            this.removeFromStackAfterLifeTime(message);
        }
    }

    showWarning(message: string, header?: string) {
        if (!this.checkMessageInStack(message)) {
            this.messageService.add({
                severity: 'warn',
                summary: header ? header : 'Warning',
                detail: message,
                life: this.messageLifeTimeInMs
            });
            this.removeFromStackAfterLifeTime(message);
        }
    }

    showError(message: string, header?: string) {
        if (!this.checkMessageInStack(message)) {
            this.messageService.add({
                severity: 'error',
                summary: header ? header : 'Error',
                detail: message,
                life: this.messageLifeTimeInMs
            });
            this.removeFromStackAfterLifeTime(message);
        }
    }

    //endregion Temporary Messages

    //region Multiple Messages
    showMultipleSuccess(data: { message: string; header: string }[]) {
        data.forEach((x) => {
            this.messageService.add({ severity: 'success', summary: x.header ? x.header : '', detail: x.message });
        });
        // this.messageService.addAll([
        //   { severity: 'success', summary: 'Message 1', detail: 'Toaster Content' },
        //   { severity: 'info', summary: 'Message 2', detail: 'Toaster Content' },
        //   { severity: 'warn', summary: 'Message 3', detail: 'Toaster Content' }
        // ]);
    }

    showMultipleWarning(data: { message: string; header: string }[]) {
        data.forEach((x) => {
            this.messageService.add({ severity: 'warn', summary: x.header, detail: x.message });
        });
    }

    showMultipleInfo(data: { message: string; header: string }[]) {
        data.forEach((x) => {
            // this.messageService.add({ severity: 'info', summary: x.header ? x.header : '', detail: x.message });
            this.showInfo(x.message, x.header);
        });
    }

    showMultipleError(data: { message: string; header: string }[]) {
        data.forEach((x) => {
            this.messageService.add({ severity: 'error', summary: x.header, detail: x.message });
        });
    }

    //endregion Multiple Messages

    //region Sticky Messages
    showStickySuccess(message: string, header?: string) {
        if (!this.checkMessageInStack(message)) {
            this.messageService.add({
                severity: 'success',
                summary: header ? header : 'Success',
                detail: message,
                sticky: true
            });
        }
    }

    showStickyInfo(message: string, header?: string) {
        if (!this.checkMessageInStack(message)) {
            this.messageService.add({
                severity: 'info',
                summary: header ? header : 'Information',
                detail: message,
                sticky: true
            });
        }
    }

    showStickyWarning(message: string, header?: string) {
        if (!this.checkMessageInStack(message)) {
            this.messageService.add({
                severity: 'warn',
                summary: header ? header : 'Warning',
                detail: message,
                sticky: true
            });
        }
    }

    showStickyError(message: string, header?: string) {
        if (!this.checkMessageInStack(message)) {
            this.messageService.add({
                severity: 'error',
                summary: header ? header : 'Error',
                detail: message,
                sticky: true
            });
        }
    }

    //endregion Sticky Messages

    clear() {
        this.messageService.clear();
        this.messageStack = [];
    }

    checkMessageInStack(message: string): boolean {
        let messageAvailableInStack = this.messageStack.some((x) => x == message);
        if (!messageAvailableInStack) {
            this.messageStack.push(message);
        }
        return messageAvailableInStack;
    }

    removeFromStack(message: string) {
        this.commonService.removeItem<string>(this.messageStack, message);
    }

    removeFromStackAfterLifeTime(message: string) {
        // Default Lifetime is now value of messageLifeTimeInMs. In primeFaces it is 3000ms
        setTimeout(() => {
            this.removeFromStack(message);
        }, this.messageLifeTimeInMs + 1);
    }
}
