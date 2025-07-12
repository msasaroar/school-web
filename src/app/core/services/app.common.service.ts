import { Injectable } from '@angular/core';
import { SHOW_TABLE_SEARCH_BAR } from '@core/constants/constants';

@Injectable({
    providedIn: 'root'
})
export class AppCommonService {
    public showTableSearchBar = SHOW_TABLE_SEARCH_BAR;

    constructor() {}

    public async copyToClipBoard(value: any): Promise<void> {
        if (navigator.clipboard && window.isSecureContext) {
            // navigator clipboard api method
            return navigator.clipboard.writeText(value).then(() => {
                // this.messageService.add({ severity: 'success', detail: 'Copied to clipboard.', life: 3000 });
            });
        } else {
            // text area method
            let textArea = document.createElement('textarea');
            textArea.value = value;
            // make the textarea out of viewport
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            textArea.style.top = '-999999px';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            return new Promise((res, rej) => {
                // here the magic happens
                document.execCommand('copy') ? res() : rej();
                textArea.remove();
                // this.messageService.add({ severity: 'success', detail: 'Copied to clipboard.' });
            });
        }
    }

    public createAndDownloadCsvFileBy2dArray(rows: any[][], fileName: string) {
        let csvContent = 'data:text/csv;charset=utf-8,';

        rows.forEach(function (rowArray) {
            let row = rowArray.join(',');
            csvContent += row + '\r\n';
        });

        let encodedUri = encodeURI(csvContent);
        let link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `${fileName.trim()}.csv`);
        document.body.appendChild(link); // Required for FF

        link.click();
    }

    camelCaseToSpaceSeparatedValue(value: string): string {
        const result = value.replace(/([A-Z])/g, ' $1');
        return result.charAt(0).toUpperCase() + result.slice(1);
    }

    removeItem<T>(array: Array<T>, value: T): Array<T> {
        const index: number = array.indexOf(value);
        if (index > -1) {
            array.splice(index, 1);
        }
        return array;
    }

    removeAllItems<T>(array: Array<T>, objectToRemove: any) {
        let i: number = 0;
        while (i < array.length) {
            if (array[i] === objectToRemove) {
                array.splice(i, 1);
            } else {
                ++i;
            }
        }
        return array;
    }

    /**
     * Generates Client side file url from BLOB http response object
     */
    generateFileSourceUrlFromBlobData(data: BlobPart | BlobPart[]): string {
        let blobParts: BlobPart[] = Array.isArray(data) ? data : [data];
        const blob = new Blob(blobParts, { type: '*/*' }); // Change the type based on your content type
        return URL.createObjectURL(blob); // generate image src for client side
    }
}
