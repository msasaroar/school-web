import { School } from '@modules/school/models/school.model';

export class Teacher {

    constructor(
        public teacherId?: number,
        public name?: string,
        public subject?: string,
        public schoolId?: number,
        public school?: School,
    ) {}

}
