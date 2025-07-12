import { Component } from '@angular/core';

@Component({
    standalone: true,
    selector: 'app-footer',
    template: `<div class="layout-footer">
        Copyright by
        <a href="#" target="_blank" rel="noopener noreferrer" class="text-primary font-bold hover:underline">Mediconcern</a>
    </div>`
})
export class AppFooter {}
