import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Data } from '@angular/router';
import { environment } from '@environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppTitleService {
    constructor(private title: Title) {}

    setTitle(data: Data): void {
        const title = data['title'];
        if (title && title?.length > 0) {
            this.title.setTitle(title);
        } else {
            this.title.setTitle(environment.title);
        }
    }

    resetTitle(): void {
        this.title.setTitle(environment.title);
    }
}
