import { Component } from '@angular/core';
import { StatsWidget } from '@modules/dashboard/pages/components/statswidget';
import { RecentSalesWidget } from '@modules/dashboard/pages/components/recentsaleswidget';
import { BestSellingWidget } from '@modules/dashboard/pages/components/bestsellingwidget';
import { RevenueStreamWidget } from '@modules/dashboard/pages/components/revenuestreamwidget';
import { NotificationsWidget } from '@modules/dashboard/pages/components/notificationswidget';

@Component({
    selector: 'app-dashboard',
    imports: [StatsWidget, RecentSalesWidget, BestSellingWidget, RevenueStreamWidget, NotificationsWidget],
    template: `
        <div class="grid grid-cols-12 gap-8">
            <app-stats-widget class="contents" />
            <div class="col-span-12 xl:col-span-6">
                <app-recent-sales-widget />
                <app-best-selling-widget />
            </div>
            <div class="col-span-12 xl:col-span-6">
                <app-revenue-stream-widget />
                <app-notifications-widget />
            </div>
        </div>
    `
})
export class Dashboard {}
