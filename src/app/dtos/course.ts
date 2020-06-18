import { Teacher } from './teacher';
import { Entity } from './Entity';

export class Course extends Entity {
    title: string;
    description: string;
    teacherId: number | null;
    teacher?: Teacher;
}