import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { BaseComponent } from '@core/components/base/base.component';
import { Class } from '@modules/class/models/class.model';
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
import { Select } from 'primeng/select';
import { School } from '@modules/school/models/school.model';
import { SelectItem } from '@core/models/select.item.model';
import { SchoolService } from '@modules/school/services/school.service';
import { Fluid } from 'primeng/fluid';
import { StudentService } from '@modules/student/services/student.service';

@Component({
    selector: 'app-student-list',
    imports: [Button, RouterLink, TableModule, ButtonDirective, TooltipModule, InputIcon, FloatLabel, InputText, ReactiveFormsModule, InputGroup, InputGroupAddon, Select, FormsModule, Fluid],
    templateUrl: './student.list.component.html',
    styleUrl: './student.list.component.scss'
})
export class StudentListComponent extends BaseComponent implements OnInit {
    query?: string;
    schoolIdQuery?: number;

    pagination: Pagination = new Pagination();
    isFetchingData: boolean = false;

    result?: Class[];
    schoolResult?: School[];
    schoolSelectItemList?: SelectItem[] = [];

    get list() {
        return this.result ?? [];
    }

    service = inject(StudentService);
    schoolService = inject(SchoolService);
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

    ngOnInit(): void {
        this.getSchoolList();
        this.getData(this.setupPagination({}, this.pagination));
    }

    getData(pagination?: Pagination) {
        this.pagination = pagination || new Pagination();
        this.subscriptions = this.service.getList(this.pagination, this.query, this.schoolIdQuery).subscribe({
            next: (response: Class[]) => {
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
        this.schoolIdQuery = undefined;
        this.getData(this.pagination);
    }

    onLazyLoad(event: TableLazyLoadEvent) {
        this.getData(this.setupPagination(event, this.pagination));
    }

    getSchoolList() {
        this.subscriptions = this.schoolService.getList({ asPage: false }).subscribe({
            next: (response: School[]) => {
                this.schoolResult = response;
                this.schoolSelectItemList = response ? (this.schoolResult?.map((x) => new SelectItem(x.name, x.schoolId)) ?? []) : [];
                // this.schoolSelectItemList = [new SelectItem("Search school", 0), ...this.schoolSelectItemList];
            },
            error: (error) => {
                this.isFetchingData = false;
            },
            complete: () => {
                this.isFetchingData = false;
            }
        });
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

    searchQuery(event: any) {
        this.query = event?.target?.value;
        this.getData(new Pagination(this.pagination));
    }

    searchBySchool(event: any) {
        this.schoolIdQuery = event?.value;
        this.getData(new Pagination(this.pagination));
    }
}
