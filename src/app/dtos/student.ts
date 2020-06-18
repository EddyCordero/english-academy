import { PersonEntity } from './PersonEntity';
import { Course } from './course';

export class Student extends PersonEntity {
    courseId: number | null;
    course?: Course;
}