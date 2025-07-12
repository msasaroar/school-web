import { Routes } from '@angular/router';
import { ClassListComponent } from '@modules/class/components/class.list/class.list.component';
import { ClassFormComponent } from '@modules/class/components/class.form/class.form.component';
import { ClassDetailsComponent } from '@modules/class/components/class.details/class.details.component';

export default [
    { path: '', component: ClassListComponent, data: { title: 'Class List' } },
    { path: 'create', component: ClassFormComponent, data: { title: 'Class Create' } },
    { path: 'update/:id', component: ClassFormComponent, data: { title: 'Class Update' } },
    { path: 'details/:id', component: ClassDetailsComponent, data: { title: 'Class Details' } }
] as Routes;
