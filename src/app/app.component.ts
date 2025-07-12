import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PreloaderComponent } from '@core/components/preloader/preloader.component';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { ConfirmationPosition } from '@core/models/confirmation.models';
import { Observable } from 'rxjs';
import { Toast } from 'primeng/toast';
import { ConfirmDialog } from 'primeng/confirmdialog';
import { AppToasterService } from '@core/services/app.toaster.service';
import { AppConfirmationDialogService } from '@core/services/app.confirmation.dialog.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterModule, PreloaderComponent, ConfirmPopup, Toast, ConfirmDialog],
    template: `
        <router-outlet></router-outlet>

        <p-toast (onClose)="removeFromStack($event)" [style]="{ 'white-space': 'pre-line', opacity: '1' }"></p-toast>

        <p-confirmDialog [baseZIndex]="10000" [position]="confirmDialogPosition" [style]="{ width: '50vw' }" key="positionDialog" rejectButtonStyleClass="p-button-outlined"></p-confirmDialog>
        <p-confirmPopup></p-confirmPopup>

        <app-preloader></app-preloader>
    `
})
export class AppComponent implements OnInit {
    confirmDialogPosition: ConfirmationPosition | any = ConfirmationPosition.BOTTOM_RIGHT;
    confirmDialogPosition$: Observable<ConfirmationPosition>;

    constructor(
        private toasterService: AppToasterService,
        private confirmationDialogService: AppConfirmationDialogService
    ) {
        this.confirmDialogPosition$ = confirmationDialogService.position$;
    }

    ngOnInit() {
        this.confirmDialogPosition$.subscribe({
            next: (value) => {
                this.confirmDialogPosition = value;
            }
        });
    }

    removeFromStack(event) {
        this.toasterService.removeFromStack(event.message.detail);
    }
}
