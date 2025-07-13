import { Component, inject, OnInit } from '@angular/core';
import { BaseComponent } from '@core/components/base/base.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AppTitleService } from '@core/services/app.title.service';
import { Class } from '@modules/class/models/class.model';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { AppConfirmationPopupService } from '@core/services/app.confirmation.popup.service';
import { AppToasterService } from '@core/services/app.toaster.service';
import { SchoolService } from '@modules/school/services/school.service';
import { School } from '@modules/school/models/school.model';
import { Fluid } from 'primeng/fluid';
import { StudentService } from '@modules/student/services/student.service';

@Component({
    selector: 'app-student-details',
    imports: [TableModule, Button, Tooltip, Fluid],
    templateUrl: './student.details.component.html',
    styleUrl: './student.details.component.scss'
})
export class StudentDetailsComponent extends BaseComponent implements OnInit {
    isFetchingData: boolean = false;

    id?: number;
    result?: Class;

    school?: School | undefined;

    get data() {
        return this.result;
    }

    service = inject(StudentService);
    schoolService = inject(SchoolService);
    router = inject(Router);
    appConfirmationPopupService = inject(AppConfirmationPopupService);
    appToasterService = inject(AppToasterService);

    constructor(
        titleService: AppTitleService,
        private route: ActivatedRoute
    ) {
        super(titleService, route);
    }

    ngOnInit(): void {
        this.subscriptions = this.route.params.subscribe((params) => {
            this.id = params['id'] as number;

            if (this.id) {
                this.getData(this.id);
            }
        });
    }

    getData(id: number) {
        this.subscriptions = this.service.getById(id).subscribe({
            next: (response: Class) => {
                this.result = response;

                // if (this.data?.schoolId) {
                //     this.getSchool(this.data?.schoolId);
                // }
            },
            error: (error) => {
                this.isFetchingData = false;
            },
            complete: () => {
                this.isFetchingData = false;
            }
        });
    }

    getSchool(id: number) {
        this.subscriptions = this.schoolService.getById(id).subscribe({
            next: (response: School) => {
                this.school = response;
            },
            error: (error) => {
                this.isFetchingData = false;
            },
            complete: () => {
                this.isFetchingData = false;
            }
        });
    }

    deleteConfirmation(event: any): void {
        this.appConfirmationPopupService.confirmCreate({
            event: event,
            accept: () => {
                this.delete(this.id);
            }
        });
    }

    delete(id?: number) {
        if (id) {
            this.subscriptions = this.service.deleteById(id).subscribe((next: boolean) => {
                this.router.navigate(['../../'], { relativeTo: this.route }).then();
            });
        }
    }

    goToUpdatePage(data?: Class) {
        this.router.navigateByUrl('/classes/update/' + data?.classId).then();
    }

    goToAuditPage(data?: any) {
        this.router.navigateByUrl('/audit-logs/' + data?.rowId).then();
    }
}
