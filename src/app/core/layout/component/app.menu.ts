import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from '@core/layout/component/app.menuitem';
import { APP_MENU_ITEM } from '../../../app.menu.list';
import { BaseComponent } from '@core/components/base/base.component';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [AppMenuitem, RouterModule],
    template: `
        <ul class="layout-menu">
            @for (item of model; track item; let i = $index) {
                @if (!item.separator) {
                    <li app-menuitem [item]="item" [index]="i" [root]="true"></li>
                } @else {
                    <li class="menu-separator"></li>
                }
            }
        </ul>
    `
})
export class AppMenu extends BaseComponent implements OnInit {
    model: MenuItem[] = [];

    query?: string;

    ngOnInit() {
        this.model = APP_MENU_ITEM;
    }
}
