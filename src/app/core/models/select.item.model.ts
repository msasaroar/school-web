export class SelectItem {

    constructor(
        public name?: string,
        public code?: any
    ) {
    }
}

export class SelectItemConfig {
    constructor(
        public value?: string,
        public label: string[] | string = [],
        public placeholder: string = 'Select'
    ){
    }
}

