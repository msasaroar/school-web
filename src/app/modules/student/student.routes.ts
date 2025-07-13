import { Routes } from '@angular/router';
import { StudentListComponent } from '@modules/student/components/student.list/student.list.component';
import { StudentFormComponent } from '@modules/student/components/student.form/student.form.component';
import { StudentDetailsComponent } from '@modules/student/components/student.details/student.details.component';

export default [
    { path: '', component: StudentListComponent, data: { title: 'Student List' } },
    { path: 'create', component: StudentFormComponent, data: { title: 'Student Create' } },
    { path: 'update/:id', component: StudentFormComponent, data: { title: 'Student Update' } },
    { path: 'details/:id', component: StudentDetailsComponent, data: { title: 'Student Details' } }
] as Routes;
