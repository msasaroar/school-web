import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { environment } from '@environments/environment';
import { enableProdMode } from '@angular/core';

if (environment.production) {
    enableProdMode();
    disableConsole();
}
setDefaultTitle();

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));

function setDefaultTitle(): void {
    document.title = environment.title;
}

function disableConsole(): void {
    if (window) {
        const EmptyFunction = () => {};

        Object.keys(window.console).forEach((key) => {
            window.console[key] = EmptyFunction;
        });
    }
}
