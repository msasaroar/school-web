import { Class } from '@modules/class/models/class.model';

export class School {
    constructor(
        public schoolId?: number,
        public name?: string,
        public address?: string,
        public teachers?: any[],
        public students?: any[],
        public classes?: Class[]
    ) {}
}
