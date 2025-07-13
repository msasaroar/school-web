import { Routes } from '@angular/router';
import { TeacherListComponent } from '@modules/teacher/components/teacher.list/teacher.list.component';
import { TeacherFormComponent } from '@modules/teacher/components/teacher.form/teacher.form.component';
import { TeacherDetailsComponent } from '@modules/teacher/components/teacher.details/teacher.details.component';

export default [
    { path: '', component: TeacherListComponent, data: { title: 'Teacher List' } },
    { path: 'create', component: TeacherFormComponent, data: { title: 'Teacher Create' } },
    { path: 'update/:id', component: TeacherFormComponent, data: { title: 'Teacher Update' } },
    { path: 'details/:id', component: TeacherDetailsComponent, data: { title: 'Teacher Details' } }
] as Routes;
