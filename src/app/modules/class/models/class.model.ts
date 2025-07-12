import { School } from '@modules/school/models/school.model';

export class Class {

    constructor(
        public classId?: number,
        public name?: string,
        public section?: string,
        public schoolId?: number,
        public school?: School,
        public students?: any[],
    ) {}

}
