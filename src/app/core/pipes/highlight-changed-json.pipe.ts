import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'highlightChangedJson' })
export class HighlightChangedJsonPipe implements PipeTransform {
    transform(newObj: any, oldObj: any): string {
        return this.formatJson(newObj, oldObj, 0);
    }

    private formatJson(current: any, previous: any, indent: number): string {
        if (typeof current !== 'object' || current === null) {
            const isChanged = current !== previous;
            const value = JSON.stringify(current);
            return isChanged
                ? `<span class="bg-orange-200 font-semibold">${value}</span>`
                : value;
        }

        const indentSpace = ' '.repeat(indent * 2);
        const entries = Object.entries(current).map(([key, val]) => {
            const oldVal = previous?.[key];
            const formattedVal = this.formatJson(val, oldVal, indent + 1);
            return `${indentSpace}  "${key}": ${formattedVal}`;
        });

        return `{\n${entries.join(',\n')}\n${indentSpace}}`;
    }
}
