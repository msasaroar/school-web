import { Component, Input, OnInit } from '@angular/core';
import { SuccessMessagePipe } from '@core/pipes/success-message.pipe';

@Component({
  selector: 'form-success-message',
  template: `
  @if (successMessages && successMessages.length > 0) {
    <div [innerHTML]="successMessages || [] | successMessage: {
                  fieldName: fieldName,
                  successCount: successCount,
                  styleClass: styleClass,
                  style: style
                }">
              </div>
  }
  `,
  styles: [],
  imports: [SuccessMessagePipe]
})
export class FormSuccessMessageComponent implements OnInit {

  successCount: number = 1;
  style: string = '';

  @Input('successMessages') successMessages?: string[];

  @Input('fieldName') fieldName?: string;

  @Input('successCount') set _successCount(value: number) {
    this.successCount = (!value || value < 1) ? 1 : value;
  };

  @Input('styleClass') styleClass?: string = '';

  @Input('style') set _style(value: { [key: string]: string }) {
    Object.keys(value).forEach(key => {
      if (key && value[key]) {
        this.style = `${this.style}${key}:${value[key]};`;
      }
    });
  };

  constructor() { }

  ngOnInit() {
  }

}
