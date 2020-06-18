import { PersonEntity } from './PersonEntity';
import { Course } from './course';

export class Teacher extends PersonEntity {
    courses?: Course[];
}