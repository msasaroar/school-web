import { Injectable } from '@angular/core';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { ConfirmationHeader, ConfirmationIcon, ConfirmationMessage, ConfirmationPosition } from '@core/models/confirmation.models';

@Injectable({
    providedIn: 'root'
})
export class AppConfirmationPopupService {
    constructor(private confirmationService: ConfirmationService) {}

    confirmCommon(confirmation: { event: any; accept: Function; reject?: Function; message?: string; header?: string; position?: ConfirmationPosition; icon?: string }) {
        if (confirmation.event && confirmation.event.target) {
            this.confirmationService.confirm({
                target: confirmation.event.target,
                message: confirmation.message ? confirmation.message : ConfirmationMessage.DEFAULT_MESSAGE,
                header: confirmation.header ? confirmation.header : ConfirmationHeader.DEFAULT_HEADER,
                icon: confirmation.icon ? confirmation.icon : ConfirmationIcon.DEFAULT_INFO_CIRCLE,
                accept: () => {
                    if (confirmation.accept) {
                        confirmation.accept();
                    }
                },
                reject: (type: ConfirmEventType) => {
                    if (confirmation.reject) {
                        confirmation.reject();
                    }
                }
            });
        } else {
            throw new Error('No target to popup the confirm dialogue.');
        }
    }

    //region Custom Popup Methods With Position
    confirmCreate(confirmation: { event: any; accept: Function; reject?: Function; message?: string; header?: string; position?: ConfirmationPosition; icon?: string }) {
        confirmation.message = confirmation.message || ConfirmationMessage.CREATE_MESSAGE;
        confirmation.header = confirmation.header || ConfirmationHeader.CREATE_HEADER;
        confirmation.icon = confirmation.icon || ConfirmationIcon.DEFAULT_INFO_CIRCLE;
        this.confirmCommon(confirmation);
    }

    confirmUpdate(confirmation: { event: any; accept: Function; reject?: Function; message?: string; header?: string; position?: ConfirmationPosition; icon?: string }) {
        confirmation.message = confirmation.message || ConfirmationMessage.UPDATE_MESSAGE;
        confirmation.header = confirmation.header || ConfirmationHeader.UPDATE_HEADER;
        confirmation.icon = confirmation.icon || ConfirmationIcon.DEFAULT_INFO_CIRCLE;
        this.confirmCommon(confirmation);
    }

    confirmDelete(confirmation: { event: any; accept: Function; reject?: Function; message?: string; header?: string; position?: ConfirmationPosition; icon?: string }) {
        confirmation.message = confirmation.message || ConfirmationMessage.DELETE_MESSAGE;
        confirmation.header = confirmation.header || ConfirmationHeader.DELETE_HEADER;
        confirmation.icon = confirmation.icon || ConfirmationIcon.DEFAULT_INFO_CIRCLE;
        this.confirmCommon(confirmation);
    }

    //endregion Custom Popup Methods With Position
}
