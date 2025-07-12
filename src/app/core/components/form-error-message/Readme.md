## Use 'form-error-message' component
1. General code snippet--
```html
 <form-error-message [control]="form.controls['address']" [fieldName]="'Customer Name'"     
    [errorCount]="3" [styleClass]="text-right mt-auto mb-auto mr-3" [style]="{'color': '#00b000 !important'}"
    [ignoreDirty]="true" [customMessage]="addressCustomMessage">
 </form-error-message>
```

### Scenario/Conventions
```
    Scenario:
        1. To set custom errors in a control the error must be set as,
            `this.form.controls.customerName.setErrors({customerNameLengthIsTooLong: "Name length is too long"})`. 
            This will show the error message as "Name length is too long".
        2. If the error message is not provided for custom errors in `setErrors` method, 
            then the error message will e the `Title Case` value of the error key. 
            For example, For this custom error settings,
                `this.form.controls.customerName.setErrors({customerNameLengthIsTooLong: null})`,
                `this.form.controls.customerName.setErrors({customerNameLengthIsTooLong: true})`,
                `this.form.controls.customerName.setErrors({customerNameLengthIsTooLong: false})`,
                `this.form.controls.customerName.setErrors({customerNameLengthIsTooLong: ''})`
            the error message will be "Customer Name Length Is Too Long".
        3. Using this `this.form.controls.customerName.setErrors({})` will not show any error message.
        4. Value of customer error key is ignored other than `string` type. For example, 
            `this.form.controls.customerName.setErrors({customerNameLengthIsTooLong: 1})`
            will show the error message same as the pervious scenario.
        5. No need to set any message for default validation errors.
        6. If value of `ignoreDirty` is set to true, then error messages will be shown without even touched.
        7. `customMessage` property is for setting error message for built-in errors of form control. 
            It should be type of `CustomFormErrorMessage`;
        8. Using "{value}" in the custom error message will be used for replacing values. For example,
            `required` error will replace "{value}" by field name,
            `minlength` error will replace "{value}" by requiredLength value,
            `min` error will replace "{value}" by min value etc.
        9. Default form errors which have default error messages are:
            (a)maxlength, (b)minlength,
            (c)max, (d)min,
            (e)required, (f)requiredTrue,
            (g)pattern,(h)email,
            (i)matDatepickerParse, (j)matDatepickerMin, (k)matDatepickerMax,
            (l)errorMinDate, (m)errorMaxDate
```

### Default Errors & Error Messages
|           Name            |                           Message                         |    Replacing Property Name   |
|           ---             |                            ---                            |            ---               |
|   maxlength               |  "Maximum length should be {value}"                       |  requiredLength              |
|   minlength               |  "Minimum length should be {value}"                       |  requiredLength              |
|   max                     |  "Maximum value should be {value}"                        |  max                         |
|   min                     |  "Minimum value should be {value}"                        |  min                         |
|   required                |  "{value} is required"                                    |  fieldName (Input Property)  |
|   requiredTrue            |  "{value} is required"                                    |  fieldName (Input Property)  |
|   pattern                 |  "Invalid Pattern"                                        |                              |
|   email                   |  "Invalid Email"                                          |                              |
|   matDatepickerParse      |  "Date format is wrong "                                  |                              |
|   matDatepickerMin        |  "Date exceeds minimum range"                             |                              |
|   matDatepickerMax        |  "Date exceeds maximum range"                             |                              |
|   minDate                 |  "Date exceeds minimum range" / "Maximum range: {value}"  |     minDate                  |
|   maxDate                 |  "Date exceeds maximum range" / "Maximum range: {value}"  |     maxDate                  |

### Properties
|           Name            |            Type           |   Default |       Description/Possible Value                                              |
|           ---             |            ---            |   ---     |       ---                                                                     |
| control                   |  AbstractControl          |   null    |  Form Control to show the errors.                                             |
| fieldName                 |  string                   |   null    |  Label of the Form Control.                                                   |
| errorCount                |  number                   |   1       |  Number of error messages to show at a time. This is an optional parameter.   |
| styleClass                |  string                   |   null    |  Additional css classes for styling the error messages.                       |
| style                     |  string                   |   null    |  Additional css for styling the error messages.                               |
| ignoreDirty               |  boolean                  |   null    |  Ignore pristine value & show errors without even touched.                    |
| customMessage             |  CustomFormErrorMessage   |   {}      |  Custom error messages for default form errors.                               |

### Future Improvements
|                                  Name                                     |         Status            |
|                                  ---                                      |          ---              |
|       Showing multiple values from error object by the object keys        |                           |
|                                                                           |                           |
|                                                                           |                           |
|                                                                           |                           |
|                                                                           |                           |
|                                                                           |                           |
|                                                                           |                           |
|                                                                           |                           |
|                                                                           |                           |
|                                                                           |                           |
|                                                                           |                           |
|                                                                           |                           |
|                                                                           |                           |
|                                                                           |                           |
|                                                                           |                           |
|                                                                           |                           |
|                                                                           |                           |
|                                                                           |                           |

***