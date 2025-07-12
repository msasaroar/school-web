import { Routes } from '@angular/router';
import { SchoolListComponent } from '@modules/school/components/school.list/school.list.component';
import { SchoolDetailsComponent } from '@modules/school/components/school.details/school.details.component';
import { SchoolFormComponent } from '@modules/school/components/school.form/school.form.component';

export default [
    { path: '', component: SchoolListComponent, data: { title: 'School List' } },
    { path: 'create', component: SchoolFormComponent, data: { title: 'School Create' } },
    { path: 'update/:id', component: SchoolFormComponent, data: { title: 'School Update' } },
    { path: 'details/:id', component: SchoolDetailsComponent, data: { title: 'School Details' } }
] as Routes;
