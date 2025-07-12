import { Component, inject, OnInit } from '@angular/core';
import { BaseComponent } from '@core/components/base/base.component';
import { SchoolService } from '@modules/school/services/school.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AppTitleService } from '@core/services/app.title.service';
import { School } from '@modules/school/models/school.model';
import { TableModule } from 'primeng/table';
import { Button } from 'primeng/button';
import { Tooltip } from 'primeng/tooltip';
import { AppConfirmationPopupService } from '@core/services/app.confirmation.popup.service';
import { AppToasterService } from '@core/services/app.toaster.service';
import { Fluid } from 'primeng/fluid';

@Component({
    selector: 'app-school-details',
    imports: [TableModule, Button, Tooltip, Fluid],
    templateUrl: './school.details.component.html',
    styleUrl: './school.details.component.scss'
})
export class SchoolDetailsComponent extends BaseComponent implements OnInit {
    isFetchingData: boolean = false;

    id?: number;
    result?: School;

    get data() {
        return this.result;
    }

    service = inject(SchoolService);
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
            next: (response: School) => {
                this.result = response;
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

    goToUpdatePage(data?: School) {
        this.router.navigateByUrl('/schools/update/' + data?.schoolId).then();
    }
}
