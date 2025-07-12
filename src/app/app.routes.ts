import { Routes } from '@angular/router';
import { AppLayout } from '@core/layout/component/app.layout';

export const appRoutes: Routes = [
    {
        path: '',
        component: AppLayout,
        // canActivate: [authGuard],
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./modules/dashboard/pages/dashboard').then((mod) => mod.Dashboard)
            },
            {
                path: 'schools',
                loadChildren: () => import('./modules/school/school.routes')
            },
            {
                path: 'classes',
                loadChildren: () => import('./modules/class/class.routes')
            },
        ]
    },
    { path: 'accessdenied', redirectTo: '/auth/accessdenied', pathMatch: 'full' },
    { path: 'error', redirectTo: '/auth/error', pathMatch: 'full' },
    { path: 'login', redirectTo: '/auth/login', pathMatch: 'full' },
    { path: 'notfound', redirectTo: '/auth/notfound', pathMatch: 'full' },
    { path: '**', redirectTo: '/notfound', pathMatch: 'full' }
];
