import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AppCommonService } from '@core/services/app.common.service';

@Pipe({
    name: 'successMessage'
})
export class SuccessMessagePipe implements PipeTransform {
    private readonly _regexForReplacingInErrorMessage = '{\\s?value\\s?}';
    private readonly _regexp = new RegExp(this._regexForReplacingInErrorMessage, 'g');

    private readonly _regexForReplacingInStyleClass = '{\\s?styleClass\\s?}';
    private readonly _regexpStyleClass = new RegExp(this._regexForReplacingInStyleClass, 'g');

    private readonly _regexForReplacingInStyle = '{\\s?style\\s?}';
    private readonly _regexpStyle = new RegExp(this._regexForReplacingInStyle, 'g');

    private readonly _startingDiv = '<small class="{styleClass} flex align-items-start p-success" style="{style} white-space:pre-wrap !important;">';
    private readonly _endingDiv = '</small>';
    private readonly _successDiv = this._startingDiv + '{value}' + this._endingDiv;

    constructor(
        private commonService: AppCommonService,
        private sanitizer: DomSanitizer
    ) {}

    transform(successMessages: string[], args: any = {}): any {
        const fieldName = args['fieldName'];
        const successCount = args['successCount'];
        const styleClass = args['styleClass'];
        const style = args['style'];

        console.log((fieldName ? fieldName : '') + ' Success Messages: ', successMessages);

        let finalSuccessMessage = '';
        let count = 0;

        if (successMessages && successMessages.length > 0) {
            for (const successMessage of successMessages) {
                if (typeof successMessage === 'string') {
                    finalSuccessMessage = finalSuccessMessage + (this._startingDiv + successMessage + this._endingDiv).replace(this._regexpStyle, style).replace(this._regexpStyleClass, styleClass);
                    count++;
                } else {
                    finalSuccessMessage =
                        finalSuccessMessage + (this._startingDiv + this.commonService.camelCaseToSpaceSeparatedValue(`${successMessage}`) + this._endingDiv).replace(this._regexpStyle, style).replace(this._regexpStyleClass, styleClass);
                    count++;
                }

                if (count == successCount) {
                    return this.sanitizer.bypassSecurityTrustHtml(finalSuccessMessage);
                }
            }
        }
        return this.sanitizer.bypassSecurityTrustHtml(finalSuccessMessage);
    }
}
