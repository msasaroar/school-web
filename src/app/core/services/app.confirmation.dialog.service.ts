import { Injectable } from '@angular/core';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { ConfirmationHeader, ConfirmationIcon, ConfirmationMessage, ConfirmationPosition } from '@core/models/confirmation.models';

@Injectable({
    providedIn: 'root'
})
export class AppConfirmationDialogService {
    private positionSubject: Subject<ConfirmationPosition> = new Subject<ConfirmationPosition>();
    position$: Observable<ConfirmationPosition> = this.positionSubject.asObservable();

    constructor(private confirmationService: ConfirmationService) {}

    //region Custom Dialog Methods With Position
    confirmCreate(confirmation: { accept: Function; reject?: Function; message?: string; header?: string; position?: ConfirmationPosition; icon?: string }) {
        confirmation.message = confirmation.message || ConfirmationMessage.CREATE_MESSAGE;
        confirmation.header = confirmation.header || ConfirmationHeader.CREATE_HEADER;
        confirmation.icon = confirmation.icon || ConfirmationIcon.DEFAULT_INFO_CIRCLE;
        this.confirmCommon(confirmation);
    }

    confirmUpdate(confirmation: { accept: Function; reject?: Function; message?: string; header?: string; position?: ConfirmationPosition; icon?: string }) {
        confirmation.message = confirmation.message || ConfirmationMessage.UPDATE_MESSAGE;
        confirmation.header = confirmation.header || ConfirmationHeader.UPDATE_HEADER;
        confirmation.icon = confirmation.icon || ConfirmationIcon.DEFAULT_INFO_CIRCLE;
        this.confirmCommon(confirmation);
    }

    confirmDelete(confirmation: { accept: Function; reject?: Function; message?: string; header?: string; position?: ConfirmationPosition; icon?: string }) {
        confirmation.message = confirmation.message || ConfirmationMessage.DELETE_MESSAGE;
        confirmation.header = confirmation.header || ConfirmationHeader.DELETE_HEADER;
        confirmation.icon = confirmation.icon || ConfirmationIcon.DEFAULT_INFO_CIRCLE;
        this.confirmCommon(confirmation);
    }

    private confirmCommon(confirmation: { accept: Function; reject?: Function; message?: string; header?: string; position?: ConfirmationPosition; icon?: string }) {
        this.positionSubject.next(confirmation.position || ConfirmationPosition.BOTTOM_RIGHT);

        this.confirmationService.confirm({
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
            },
            key: 'positionDialog'
        });
    }

    //endregion Custom Dialog Methods With Position
}
