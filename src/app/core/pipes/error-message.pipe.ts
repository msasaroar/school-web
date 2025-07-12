import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CustomFormErrorMessage } from '@core/components/form-error-message/form-error-message.component';
import { AppCommonService } from '@core/services/app.common.service';

@Pipe({
    name: 'errorMessage'
})
export class ErrorMessagePipe implements PipeTransform {
    private readonly _regexForReplacingInStyleClass = '{\\s?styleClass\\s?}';
    private readonly _regexpStyleClass = new RegExp(this._regexForReplacingInStyleClass, 'g');

    private readonly _regexForReplacingInStyle = '{\\s?style\\s?}';
    private readonly _regexpStyle = new RegExp(this._regexForReplacingInStyle, 'g');

    private readonly _regexForReplacingInErrorMessage = '{\\s?value\\s?}';
    private readonly _regexpError = new RegExp(this._regexForReplacingInErrorMessage, 'g');

    private readonly _startingDiv = `<small style="color: red;
                                                     white-space:pre-wrap !important;
                                                     display: flex;
                                                     align-content: flex-start;
                                                     {style}"
                                            class="{styleClass}">`;
    private readonly _endingDiv = '</small>';
    private readonly _errorDiv = this._startingDiv + '{value}' + this._endingDiv;

    private _errorMessages: { [key in ErrorKeys]: string } = {
        maxlength: this._startingDiv + 'Maximum length should be {value}' + this._endingDiv,
        minlength: this._startingDiv + 'Minimum length should be {value}' + this._endingDiv,
        max: this._startingDiv + 'Maximum value should be {value}' + this._endingDiv,
        min: this._startingDiv + 'Minimum value should be {value}' + this._endingDiv,
        required: this._startingDiv + '{value} is required' + this._endingDiv,
        requiredTrue: this._startingDiv + '{value} is required' + this._endingDiv,
        pattern: this._startingDiv + 'Invalid Pattern' + this._endingDiv,
        email: this._startingDiv + 'Invalid Email' + this._endingDiv,
        matDatepickerParse: this._startingDiv + 'Date format is wrong' + this._endingDiv,
        matDatepickerMin: this._startingDiv + 'Exceeded minimum range' + this._endingDiv,
        matDatepickerMax: this._startingDiv + 'Exceeded maximum range' + this._endingDiv,
        minDate: this._startingDiv + 'Exceeded minimum range. Min range: {value}' + this._endingDiv,
        maxDate: this._startingDiv + 'Exceeded maximum range. Max range: {value}' + this._endingDiv
    };

    constructor(
        private commonService: AppCommonService,
        private sanitizer: DomSanitizer
    ) {}

    transform(errors: any, args: any = {}): any {
        if (!errors) {
            return this.sanitizer.bypassSecurityTrustHtml('');
        }

        const errorCount: number = args['errorCount'];
        const styleClass: string = args['styleClass'];
        const style: string = args['style'];
        const fieldName: string = args['fieldName'];
        const customMessage: CustomFormErrorMessage | { [key: string]: string } | any = args['customMessage'] as { [key: string]: string };
        console.log((fieldName ? fieldName : '') + ' Errors: ', errors);

        const errorKeys: string[] = Object.keys(errors);

        let finalErrorMessage: string = '';
        let count: number = 0;

        for (const key of errorKeys) {
            finalErrorMessage =
                finalErrorMessage +
                this.generateErrorMessage(
                    key as ErrorKeys, // Assert that key is of type ErrorKeys
                    errors[key],
                    customMessage && customMessage[key] ? this._errorDiv.replace(this._regexpError, customMessage[key]) : this._errorMessages[key as ErrorKeys], // Assert that key is of type ErrorKeys
                    this._errorDiv,
                    fieldName
                )
                    .replace(this._regexpStyle, style)
                    .replace(this._regexpStyleClass, styleClass);
            count++;

            if (count == errorCount) {
                return this.sanitizer.bypassSecurityTrustHtml(finalErrorMessage);
            }
        }
        return this.sanitizer.bypassSecurityTrustHtml(finalErrorMessage);
    }

    generateErrorMessage(key: ErrorKeys, error: any, errorMessage: string, errorDiv: string, fieldName?: string): string {
        const _regexForReplacingInErrorMessage = '{\\s?value\\s?}';
        const _regexpError = new RegExp(_regexForReplacingInErrorMessage, 'g');

        if (typeof error === 'string') {
            return errorDiv.replace(_regexpError, error); // (startingDiv + error + endingDiv);
        } else {
            switch (key) {
                case ErrorKeys.required:
                    if (fieldName && fieldName.length > 0) {
                        return errorMessage.replace(_regexpError, fieldName);
                    } else {
                        return errorDiv.replace(_regexpError, 'This field is required');
                    }
                case ErrorKeys.requiredTrue:
                    if (fieldName && fieldName.length > 0) {
                        return errorMessage.replace(_regexpError, fieldName);
                    } else {
                        return errorDiv.replace(_regexpError, 'This field is required');
                    }
                case ErrorKeys.maxlength:
                    return errorMessage.replace(_regexpError, error.requiredLength);
                case ErrorKeys.minlength:
                    return errorMessage.replace(_regexpError, error.requiredLength);
                case ErrorKeys.max:
                    return errorMessage.replace(_regexpError, error.max);
                case ErrorKeys.min:
                    return errorMessage.replace(_regexpError, error.min);
                case ErrorKeys.maxDate:
                    return errorMessage.replace(_regexpError, error.maxDate);
                case ErrorKeys.minDate:
                    return errorMessage.replace(_regexpError, error.minDate);
                default:
                    if (errorMessage) {
                        return errorMessage;
                    } else {
                        return errorDiv.replace(_regexpError, this.commonService.camelCaseToSpaceSeparatedValue(`${key}`));
                    }
            }
        }
    }
}

enum ErrorKeys {
    maxlength = 'maxlength',
    minlength = 'minlength',
    max = 'max',
    min = 'min',
    required = 'required',
    requiredTrue = 'requiredTrue',
    pattern = 'pattern',
    email = 'email',
    matDatepickerParse = 'matDatepickerParse',
    matDatepickerMin = 'matDatepickerMin',
    matDatepickerMax = 'matDatepickerMax',
    minDate = 'minDate',
    maxDate = 'maxDate'
}
