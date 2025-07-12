import { Component, computed, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from '@core/layout/component/app.configurator';
import { LayoutService } from '@core/layout/service/layout.service';
import { AuthService } from '@modules/auth/services/auth.service';
import { Router } from '@angular/router';
import { UserLocalStorageService } from '@modules/auth/services/user.localStorage.service';

@Component({
    selector: 'app-floating-configurator',
    imports: [ButtonModule, StyleClassModule, AppConfigurator],
    template: `
        <div class="fixed flex gap-4 top-8 right-8">
            <p-button type="button" (onClick)="toggleDarkMode()" [rounded]="true"
                      [icon]="isDarkTheme() ? 'pi pi-moon' : 'pi pi-sun'" severity="secondary" />
            <div class="relative">
                <p-button icon="pi pi-palette" pStyleClass="@next" enterFromClass="hidden"
                          enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout"
                          [hideOnOutsideClick]="true" type="button" rounded />
                <app-configurator />
            </div>
            @if (isAuthenticated) {
                <p-button type="button" (onClick)="logout()" [rounded]="true"
                          [icon]="'pi pi-sign-out'" severity="secondary" />
            }
        </div>
    `
})
export class AppFloatingConfigurator {
    layoutService = inject(LayoutService);
    authService = inject(AuthService);
    userLocalStorageService = inject(UserLocalStorageService);
    router = inject(Router);

    isDarkTheme = computed(() => this.layoutService.layoutConfig().darkTheme);

    toggleDarkMode() {
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/auth/login']).then();
    }

    get isAuthenticated(): boolean {
        return this.userLocalStorageService.isJwtTokenActive;
    }
}
