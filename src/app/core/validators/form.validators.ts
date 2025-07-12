import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { DATE_FORMAT } from '@core/constants/constants';

// Form Validators
export class FormValidators {
    //#region Variables

    /**
     * es-CL => dd-mm-yyyy
     *
     * es-GB => dd/mm/yyyy
     * */
    static readonly dateFormat: string = DATE_FORMAT.includes('/') ? 'es-GB' : 'es-CL';

    private static readonly replaceRegexp = new RegExp('{\\s?value\\s?}', 'g');

    //#endregion Variables

    //#region Errors
    private static requiredError(errorMessage?: string): ValidationErrors | null {
        return { required: errorMessage || true };
    }

    //#endregion errors

    //#region Helper Methods

    private static isEmptyInputValue(value: any): boolean {
        return value == null || ((typeof value === 'string' || Array.isArray(value)) && value.length === 0);
    }

    private static hasValidLength(value: any): boolean {
        return value != null && typeof value.length === 'number';
    }

    //#endregion Helper Methods

    //#region Validators

    static minDate(minDate: Date, errorMessage?: string): ValidatorFn | null {
        return (control: AbstractControl): ValidationErrors | null => {
            if (this.isEmptyInputValue(control.value) || this.isEmptyInputValue(minDate)) {
                return null; // don't validate empty values to allow optional controls
            }
            return !this.isEmptyInputValue(control.value) && new Date(control.value) < minDate
                ? {
                      minDate: (errorMessage || '').replace(this.replaceRegexp, minDate.toLocaleDateString(this.dateFormat)) || {
                          minDate: minDate.toLocaleDateString(this.dateFormat),
                          actual: new Date(control.value).toLocaleDateString(this.dateFormat)
                      }
                  }
                : null;
        };
    }

    static maxDate(maxDate: Date, errorMessage?: string): ValidatorFn | null {
        return (control: AbstractControl): ValidationErrors | null => {
            if (this.isEmptyInputValue(control.value) || this.isEmptyInputValue(maxDate)) {
                return null; // don't validate empty values to allow optional controls
            }
            return !this.isEmptyInputValue(control.value) && new Date(control.value) > maxDate
                ? {
                      maxDate: (errorMessage || '').replace(this.replaceRegexp, maxDate.toLocaleDateString(this.dateFormat)) || {
                          maxDate: maxDate.toLocaleDateString(this.dateFormat),
                          actual: new Date(control.value).toLocaleDateString(this.dateFormat)
                      }
                  }
                : null;
        };
    }

    static email(errorMessage?: string): ValidatorFn | null {
        return (control: AbstractControl): ValidationErrors | null => {
            if (this.isEmptyInputValue(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }

            const re_email: RegExp = /^(([^^!*,<>()\[\]\\.;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            const emailRegexp = new RegExp(re_email);
            return emailRegexp.test(control.value) ? null : { email: errorMessage || true };
        };
    }

    static pattern(pattern: RegExp, errorMessage?: string): ValidatorFn | null {
        let _pattern: RegExp;
        if (!pattern) {
            return null; // don't validate empty values to allow optional controls
        } else {
            if (typeof pattern == 'string') {
                _pattern = new RegExp(pattern);
            } else {
                _pattern = pattern;
            }
        }

        if (errorMessage) {
            return (control: AbstractControl): ValidationErrors | null => {
                if (this.isEmptyInputValue(control.value)) {
                    return null; // don't validate empty values to allow optional controls
                }

                const value: string = control.value;
                return _pattern.test(value) ? null : { pattern: errorMessage || true };
            };
        } else {
            return Validators.pattern(pattern);
        }
    }

    static required(errorMessage?: string): ValidatorFn | null {
        return (control: AbstractControl): ValidationErrors | null => {
            return this.isEmptyInputValue(control.value) ? this.requiredError(errorMessage) : null;
        };
    }

    static requiredTrue(errorMessage?: string): ValidatorFn | null {
        return (control: AbstractControl): ValidationErrors | null => {
            return control.value === true ? null : this.requiredError(errorMessage);
        };
    }

    static maxLength(maxLength: number, errorMessage?: string): ValidatorFn | null {
        return (control: AbstractControl): ValidationErrors | null => {
            return this.hasValidLength(control.value) && control.value.length > maxLength ? { maxlength: (errorMessage || '').replace(this.replaceRegexp, `${maxLength}`) || { requiredLength: maxLength, actualLength: control.value.length } } : null;
        };
    }

    static minLength(minLength: number, errorMessage?: string): ValidatorFn | null {
        return (control: AbstractControl): ValidationErrors | null => {
            if (this.isEmptyInputValue(control.value) || !this.hasValidLength(control.value)) {
                return null; // don't validate empty values to allow optional controls
            }

            return this.hasValidLength(control.value) && control.value.length < minLength ? { minlength: (errorMessage || '').replace(this.replaceRegexp, `${minLength}`) || { requiredLength: minLength, actualLength: control.value.length } } : null;
        };
    }

    static max(max: number, errorMessage?: string): ValidatorFn | null {
        return (control: AbstractControl): ValidationErrors | null => {
            if (this.isEmptyInputValue(control.value) || this.isEmptyInputValue(max)) {
                return null; // don't validate empty values to allow optional controls
            }
            const value = parseFloat(control.value);

            return !isNaN(value) && value > max ? { max: (errorMessage || '').replace(this.replaceRegexp, `${max}`) || { max: max, actual: control.value } } : null;
        };
    }

    static min(min: number, errorMessage?: string): ValidatorFn | null {
        return (control: AbstractControl): ValidationErrors | null => {
            if (this.isEmptyInputValue(control.value) || this.isEmptyInputValue(min)) {
                return null;
            }
            const value = parseFloat(control.value);

            return !isNaN(value) && value < min ? { min: (errorMessage || '').replace(this.replaceRegexp, `${min}`) || { min: min, actual: control.value } } : null;
        };
    }

    //#endregion Validators
}
