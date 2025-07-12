import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ErrorMessagePipe } from '@core/pipes/error-message.pipe';

@Component({
    selector: 'form-error-message',
    template: ` <div
        style="display: inline-block; margin: 0;"
        [innerHTML]="
            (control && (!control?.pristine || ignoreDirty) ? control?.errors || {} : {})
                | errorMessage
                    : {
                          fieldName: fieldName,
                          errorCount: errorCount,
                          styleClass: styleClass,
                          style: style,
                          customMessage: customMessage
                      }
        "
    ></div>`,
    styles: [],
    imports: [ErrorMessagePipe]
})
export class FormErrorMessageComponent implements OnInit {
    errorCount: number = 1;
    style: string = '';

    @Input('control') control?: AbstractControl | null;

    @Input('ignoreDirty') ignoreDirty?: boolean = false;

    @Input('customMessage') customMessage: CustomFormErrorMessage = new CustomFormErrorMessage();

    @Input('fieldName') fieldName?: string;

    @Input('errorCount') set _errorCount(value: number) {
        this.errorCount = !value || value < 1 ? 1 : value;
    }

    @Input('styleClass') styleClass?: string = '';

    @Input('style') set _style(value: { [key: string]: string }) {
        Object.keys(value).forEach((key) => {
            if (key && value[key]) {
                this.style = this.style + `${this.style}${key}:${value[key]};`;
            }
        });
    }

    constructor() {}

    ngOnInit() {}
}

export class CustomFormErrorMessage {
    required?: string;
    maxlength?: string;
    minlength?: string;
    max?: string;
    min?: string;
    pattern?: string;
    email?: string;
    requiredTrue?: string;
    matDatepickerParse?: string;
    matDatepickerMin?: string;
    matDatepickerMax?: string;
    maxDate?: string;
    minDate?: string;

    constructor(data?: {
        required?: string;
        maxlength?: string;
        minlength?: string;
        max?: string;
        min?: string;
        pattern?: string;
        email?: string;
        requiredTrue?: string;
        matDatepickerParse?: string;
        matDatepickerMin?: string;
        matDatepickerMax?: string;
        maxDate?: string;
        minDate?: string;
    }) {
        if (!data) data = {};

        this.required = data?.required;
        this.maxlength = data?.maxlength;
        this.minlength = data?.minlength;
        this.max = data?.max;
        this.min = data?.min;
        this.pattern = data?.pattern;
        this.email = data?.email;
        this.requiredTrue = data?.requiredTrue;
        this.matDatepickerParse = data?.matDatepickerParse;
        this.matDatepickerMin = data?.matDatepickerMin;
        this.matDatepickerMax = data?.matDatepickerMax;
        this.maxDate = data?.maxDate;
        this.minDate = data?.minDate;
    }
}
