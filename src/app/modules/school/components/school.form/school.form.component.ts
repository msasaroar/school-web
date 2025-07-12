import { Component, inject, OnInit } from '@angular/core';
import { BaseComponent } from '@core/components/base/base.component';
import { School } from '@modules/school/models/school.model';
import { SchoolService } from '@modules/school/services/school.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppTitleService } from '@core/services/app.title.service';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormValidators } from '@core/validators/form.validators';
import { FormErrorMessageComponent } from '@core/components/form-error-message/form-error-message.component';
import { Button } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { FloatLabel } from 'primeng/floatlabel';
import { Fluid } from 'primeng/fluid';
import { AppConfirmationPopupService } from '@core/services/app.confirmation.popup.service';
import { AppToasterService } from '@core/services/app.toaster.service';
import { TooltipModule } from 'primeng/tooltip';
import { Card } from 'primeng/card';

@Component({
    selector: 'app-school-form',
    imports: [ReactiveFormsModule, FormErrorMessageComponent, Button, InputText, FloatLabel, Fluid, TooltipModule, Card],
    templateUrl: './school.form.component.html',
    styleUrl: './school.form.component.scss'
})
export class SchoolFormComponent extends BaseComponent implements OnInit {
    isFetchingData: boolean = false;

    id?: number;
    isEditPage: boolean = false;
    result?: School;

    form: FormGroup = new FormGroup({});

    get data() {
        return this.result;
    }

    service = inject(SchoolService);
    router = inject(Router);
    formBuilder = inject(FormBuilder);
    appConfirmationPopupService = inject(AppConfirmationPopupService);
    appToasterService = inject(AppToasterService);

    constructor(
        titleService: AppTitleService,
        private route: ActivatedRoute
    ) {
        super(titleService, route);
        this.prepareForm();
    }

    ngOnInit(): void {
        this.prepareForm();
        this.subscriptions = this.route.params.subscribe((params) => {
            this.id = params['id'] as number;

            if (this.id) {
                this.isEditPage = true;
                this.getData(this.id);
            }
        });
    }

    getData(id: number) {
        this.subscriptions = this.service.getById(id).subscribe({
            next: (response: School) => {
                this.result = response;
                this.prepareForm(this.data);
            },
            error: (error) => {
                this.isFetchingData = false;
            },
            complete: () => {
                this.isFetchingData = false;
            }
        });
    }

    prepareForm(model?: School): void {
        model = model || new School();
        model.schoolId = model.schoolId || this.id || 0;

        this.form = this.formBuilder.group({
            schoolId: [model.schoolId || 0, []],

            name: [model.name || null, [FormValidators.required()]],

            address: [model.address || null, [FormValidators.required()]]
        });
    }

    saveFormDataConfirmation(event: any, isExit: boolean = false): void {
        if (this.isEditPage) return;

        this.appConfirmationPopupService.confirmCreate({
            event: event,
            accept: () => {
                this.saveFormData(isExit);
            }
        });
    }

    updateFormDataConfirmation(model: any, isExit: boolean = false): void {
        if (!this.isEditPage) return;

        this.appConfirmationPopupService.confirmUpdate({
            event: model,
            accept: () => {
                this.updateFormData(isExit);
            }
        });
    }

    saveFormData(isExit: boolean): void {
        this.markFormGroupAsTouched(this.form);
        if (this.form?.invalid) return;

        this.subscriptions = this.service.create(this.form.value as School).subscribe((next: School) => {
            if (isExit) {
                this.router.navigate(['../'], { relativeTo: this.route }).then();
            } else {
                this.resetFormData();
            }
        });
    }

    updateFormData(isExit: boolean): void {
        this.markFormGroupAsTouched(this.form);
        if (this.form?.invalid) return;

        this.subscriptions = this.service.update(this.form.value as School).subscribe((next: School) => {
            if (isExit) {
                this.router.navigate(['../../'], { relativeTo: this.route }).then();
            } else {
                this.resetFormData();
            }
        });
    }

    resetFormData(event?: any): void {
        if (!event) {
            this.ngOnInit();
            return;
        }

        this.appConfirmationPopupService.confirmCommon({
            event: event,
            message: 'Are you sure that you want to reset?',
            accept: () => {
                this.ngOnInit();
            }
        });
    }
}
