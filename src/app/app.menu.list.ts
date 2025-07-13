import { MenuItem } from "primeng/api";

export const APP_MENU_ITEM: MenuItem[] = [
    {
        label: 'Home',
        items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }]
    },
    {
        label: 'Configuration',
        items: [
            { label: 'School', icon: 'pi pi-fw pi-globe', routerLink: ['/schools'] },
            { label: 'Class', icon: 'pi pi-fw pi-globe', routerLink: ['/classes'] },
            { label: 'Teacher', icon: 'pi pi-fw pi-globe', routerLink: ['/teachers'] },
            { label: 'Student', icon: 'pi pi-fw pi-globe', routerLink: ['/students'] },
        ]
    },
];
