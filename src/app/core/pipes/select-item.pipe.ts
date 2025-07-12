import { Pipe, PipeTransform } from '@angular/core';
import { SelectItem } from 'primeng/api';
import { SelectItemConfig } from '@core/models/select.item.model';

@Pipe({
    name: 'selectItem'
})
export class SuccessItemPipe implements PipeTransform {
    defaultPlaceholder: string = 'Select';

    constructor() {}

    transform(data: any[], args: SelectItemConfig): SelectItem[] {
        args = args || new SelectItemConfig();

        let placeholder = args['placeholder'] || this.defaultPlaceholder;
        let itemLabels = args['label'];
        let itemValue = args['value'];

        const selectAnOption: SelectItem = { label: placeholder, value: null };
        let resultedItems: SelectItem[] = [selectAnOption];
        if (!data || !Array.isArray(data) || data.length == 0) return resultedItems;

        itemLabels = typeof itemLabels == 'string' ? [itemLabels] : itemLabels;
        if (!itemLabels || itemLabels.length === 0 || !itemValue) return resultedItems;

        let returnEmpty: boolean = false;

        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            if (!item || item[itemValue] == null || item[itemValue] == undefined) {
                returnEmpty = true;
                break;
            }

            let labelTemp: string = '';
            itemLabels.forEach((l, index) => {
                if (((item[l] || '') + '').trim()) {
                    if (index == 0) {
                        labelTemp += item[l];
                    } else {
                        labelTemp += ' - ' + item[l];
                    }
                }
            });
            if (labelTemp && labelTemp.length) {
                resultedItems.push({
                    label: labelTemp,
                    value: item[itemValue]
                });
            }
        }

        if (returnEmpty) {
            return [selectAnOption];
        }

        resultedItems = [...resultedItems];

        return resultedItems;
    }
}
