import { Component, inject, OnInit } from '@angular/core';
import { BaseComponent } from '@core/components/base/base.component';
import { Class } from '@modules/class/models/class.model';
import { ClassService } from '@modules/class/services/class.service';
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
import { PagedData } from '@core/models/pagination.model';
import { School } from '@modules/school/models/school.model';
import { SelectItem } from '@core/models/select.item.model';
import { SchoolService } from '@modules/school/services/school.service';
import { Select } from 'primeng/select';
import { Card } from 'primeng/card';

@Component({
    selector: 'app-class-form',
    imports: [ReactiveFormsModule, FormErrorMessageComponent, Button, InputText, FloatLabel, Fluid, TooltipModule, Select, Card],
    templateUrl: './class.form.component.html',
    styleUrl: './class.form.component.scss'
})
export class ClassFormComponent extends BaseComponent implements OnInit {
    isFetchingData: boolean = false;

    id?: number;
    isEditPage: boolean = false;

    result?: Class;

    schoolResult?: School[]
    schoolSelectItemList: SelectItem[] = [];

    form: FormGroup = new FormGroup({});

    get data() {
        return this.result;
    }

    service = inject(ClassService);
    schoolService = inject(SchoolService);
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
        this.getSchoolList();
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
            next: (response: Class) => {
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

    getSchoolList() {
        this.subscriptions = this.schoolService.getList({ asPage: false }).subscribe({
            next: (response: School[]) => {
                this.schoolResult = response;
                this.schoolSelectItemList = response ? (this.schoolResult?.map((x) => new SelectItem(x.name, x.schoolId)) ?? []) : [];
                // this.schoolSelectItemList = [new SelectItem("Select School", null), ...this.schoolSelectItemList];
            },
            error: (error) => {
                this.isFetchingData = false;
            },
            complete: () => {
                this.isFetchingData = false;
            }
        });
    }

    prepareForm(model?: Class): void {
        model = model || new Class();
        model.classId = model.classId || this.id || 0;

        this.form = this.formBuilder.group({
            classId: [model.classId || 0, []],

            name: [model.name || null, [FormValidators.required()]],

            section: [model.section || null, [FormValidators.required()]],

            schoolId: [model.schoolId || null, [FormValidators.required()]]
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

        this.subscriptions = this.service.create(this.form.value as Class).subscribe((next: Class) => {
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

        this.subscriptions = this.service.update(this.form.value as Class).subscribe((next: Class) => {
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
