import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { SchoolService } from '@modules/school/services/school.service';
import { BaseComponent } from '@core/components/base/base.component';
import { School } from '@modules/school/models/school.model';
import { Pagination } from '@core/models/pagination.model';
import { AppTitleService } from '@core/services/app.title.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Button, ButtonDirective } from 'primeng/button';
import { TableLazyLoadEvent, TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { AppConfirmationPopupService } from '@core/services/app.confirmation.popup.service';
import { AppToasterService } from '@core/services/app.toaster.service';
import { InputIcon } from 'primeng/inputicon';
import { FloatLabel } from 'primeng/floatlabel';
import { InputText } from 'primeng/inputtext';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputGroup } from 'primeng/inputgroup';
import { InputGroupAddon } from 'primeng/inputgroupaddon';
import { Fluid } from 'primeng/fluid';

@Component({
    selector: 'app-school-list',
    imports: [Button, RouterLink, TableModule, ButtonDirective, TooltipModule, InputIcon, FloatLabel, InputText, ReactiveFormsModule, InputGroup, InputGroupAddon, FormsModule, Fluid],
    templateUrl: './school.list.component.html',
    styleUrl: './school.list.component.scss'
})
export class SchoolListComponent extends BaseComponent {
    query?: string;
    pagination: Pagination = new Pagination();
    isFetchingData: boolean = false;

    result?: School[];

    get list() {
        return this.result ?? [];
    }

    service = inject(SchoolService);
    cd = inject(ChangeDetectorRef);
    router = inject(Router);
    appConfirmationPopupService = inject(AppConfirmationPopupService);
    appToasterService = inject(AppToasterService);

    constructor(
        titleService: AppTitleService,
        private route: ActivatedRoute
    ) {
        super(titleService, route);
    }

    getData(pagination?: Pagination) {
        this.pagination = pagination || new Pagination();
        this.subscriptions = this.service.getList(this.pagination, this.query).subscribe({
            next: (response: School[]) => {
                this.result = response;
                this.pagination = new Pagination({
                    pageNumber: this.pagination.pageNumber,
                    pageSize: this.pagination.pageSize,
                    totalRecord: response?.length
                });
            },
            error: (error) => {
                this.isFetchingData = false;
                this.cd.detectChanges();
            },
            complete: () => {
                this.isFetchingData = false;
                this.cd.detectChanges();
            }
        });
    }

    refresh() {
        this.query = undefined;
        this.getData(this.pagination);
    }

    onLazyLoad(event: TableLazyLoadEvent) {
        this.getData(this.setupPagination(event, this.pagination));
    }

    deleteConfirmation(event: any, id: number): void {
        this.appConfirmationPopupService.confirmDelete({
            event: event,
            accept: () => {
                this.delete(id);
            }
        });
    }

    delete(id?: number) {
        if (id) {
            this.subscriptions = this.service.deleteById(id).subscribe((next: boolean) => {
                this.getData(this.pagination.recalculate());
            });
        }
    }

    goToCreatePage() {
        this.router.navigate(['create'], { relativeTo: this.route }).then();
    }

    search(event?: any) {
        this.query = event?.target?.value as string;
        this.getData(new Pagination(this.pagination));
    }
}
