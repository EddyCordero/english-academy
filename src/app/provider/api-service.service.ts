import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Teacher } from '../dtos/teacher';
import { Course } from '../dtos/course';
import { Student } from '../dtos/student';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ApiServiceService {

  baseurl = environment.apiURL;

  constructor(private http: HttpClient) { }
  
  getTeachers() : Observable<any> {
    return this.http.get<Teacher[]>(`${this.baseurl}teachers`);
  }

  createTeacher(teacher: Teacher) : Observable<any> {
    return this.http.post<Teacher>(`${this.baseurl}teachers`, teacher)
  }

  updateTeacher(param: Teacher) : Observable<any> {
    return this.http.put(`${this.baseurl}teachers`, param);
  }

  delete(id: number) : Observable<any> {
    return this.http.delete(`${this.baseurl}teachers/${id}`);
  }

  getTeacher(id:number) : Observable<any> {
    return this.http.get(`${this.baseurl}teachers/${id}`);
  }

  getStudentsByTeacher(teacherId: number) : Observable<any> {
    return this.http.get(`${this.baseurl}teachers/${teacherId}/Students`);
  }

  getCourseByTeacher(teacherId: number) : Observable<any> {
    return this.http.get(`${this.baseurl}teachers/${teacherId}/Courses`);
  }

  createCourse(course: Course) : Observable<any> {
    return this.http.post<Course>(`${this.baseurl}teachers/${course.teacherId}/courses`, course)
  }

  updateCourse(course: Course) : Observable<any> {
    return this.http.put(`${this.baseurl}teachers/${course.teacherId}/courses`, course)
  }

  deleteCourse(teacherId, id) : Observable<any> {
    return this.http.delete(`${this.baseurl}teachers/${teacherId}/courses/${id}`);
  }

  getStudents() : Observable<any> {
    return this.http.get(`${this.baseurl}Students`);
  }

  createStudent(student: Student) : Observable<any> {
    debugger;
    return this.http.post<Student>(`${this.baseurl}students`, student)
  }

  updateStudent(param: Student) : Observable<any> {
    return this.http.put(`${this.baseurl}students`, param);
  }

  deleteStudent(id: number) : Observable<any> {
    return this.http.delete(`${this.baseurl}students/${id}`);
  }

  getStudent(id:number) : Observable<any> {
    return this.http.get(`${this.baseurl}students/${id}`);
  }
}
