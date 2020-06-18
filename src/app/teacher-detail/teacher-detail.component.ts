import { ApiServiceService } from './../provider/api-service.service';
import { Student } from './../dtos/student';
import { Component, OnInit, OnDestroy, ViewChild  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Teacher } from '../dtos/teacher';
import { Course } from '../dtos/course';
import { Subscriber, Subscription } from 'rxjs';
import { NgbModalOptions, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-teacher-detail',
  templateUrl: './teacher-detail.component.html',
  styleUrls: ['./teacher-detail.component.css']
})
export class TeacherDetailComponent implements OnInit, OnDestroy {
  sub: any;
  id: number;
  teacher$: Subscription;
  teacher: Teacher;
  courses$: Subscription;
  courses: Course[];
  students$: Subscription;
  students: Student[];
  teacherId: number;

  public title: string;
  public description: string;
  public parameterTeacherId: number;

  public editTitle: string;
  public editDescription: string;
  public editTeacherId: number;


  public modalOption: NgbModalOptions = {};
  public modalReference: NgbModalRef;
  
  public addFirstName: string;
  public addLastName: string;
  public addDateOfBirth: string;
  public courseId: number;

  public editFirstName: string;
  public editLastName: string;
  public editDateOfBirth: string;
  public editCourseId: number;


  @ViewChild('AddContentModal', {static: false}) addContentModal: NgbModalRef;
  @ViewChild('EditContentModal', {static: false}) editContentModal: NgbModalRef;

  @ViewChild('AddStudentModal', {static: false}) addStudentModal: NgbModalRef;
  @ViewChild('EditStudentModal', {static: false}) editStudentModal: NgbModalRef;

  editId: number;

  constructor(private route: ActivatedRoute, private apiServiceService: ApiServiceService, private modalService: NgbModal) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.id = +params['id'];
       this.parameterTeacherId == +params['id'];
    });

    this.getFromData();
  }

  ngOnDestroy() {
    if(this.teacher$) {
      this.teacher$.unsubscribe();
    }

    if(this.courses$) {
      this.courses$.unsubscribe();
    }

    if(this.students$) {
      this.students$.unsubscribe();
    }
  }

  async getFromData() {
    this.teacher$ = await this.apiServiceService.getTeacher(this.id).subscribe(data => {
      this.teacher = data;
    }, err => {
      console.log(err);
    });

    this.courses$ = await this.apiServiceService.getCourseByTeacher(this.id).subscribe(data => {
      this.courses = data;
    }, err => {
      console.log(err);
    });

    this.students$ = await this.apiServiceService.getStudents().subscribe(data => {
      this.students = data;
    }, err => {
      console.log(err);
    });
  }

  deleteCourse(teacherId:number, id: number) {
    var isPositive = confirm("Esta Seguro que desea eliminar este Maestro?");

    if(isPositive)
    {
      this.apiServiceService.deleteCourse(teacherId, id)
        .subscribe(data => {
          window.location.reload();
        }, err => {

        });
    }
  }

  addCourse() {
    let param: Course = {
      title: this.title,
      description: this.description,
      teacherId: this.teacherId
    };    

    this.apiServiceService.createCourse(param)
        .subscribe(data => {
          console.log("La data", data);
          window.location.reload();
        }, err => {
          window.location.reload();
        });
  }

  editCourse() {
    let course: Course = {
      id: this.editId,
      title: this.editTitle,
      description: this.editDescription,
      teacherId: this.editTeacherId
    };  

    this.apiServiceService.updateCourse(course)
        .subscribe(data => {
          window.location.reload();
        }, err => {

        });
  }
  
  openEditCourseModal(data: Course) {
    console.log(data);
    this.editId = data.id;
    this.editTitle = data.title;
    this.editDescription = data.description;
    this.editTeacherId = data.teacherId;

    this.modalReference = this.modalService.open(this.editContentModal, this.modalOption);
  }

  deleteStudent(id: number) {
    var isPositive = confirm("Esta Seguro que desea eliminar este Maestro?");

    if(isPositive)
    {
      this.apiServiceService.deleteStudent(id)
        .subscribe(data => {
          window.location.reload();
        }, err => {

        });
    }
  }

  addStudent() {
    let param: Student = {
      firstName: this.addFirstName,
      lastName: this.addLastName,
      dateOfBirth: this.addDateOfBirth,
      courseId: this.courseId
    };    

    this.apiServiceService.createStudent(param)
        .subscribe(data => {
          window.location.reload();
        }, err => {

        });
  }

  editStudent() {
    let student: Student = {
      id: this.editId,
      firstName: this.editFirstName,
      lastName: this.editLastName,
      dateOfBirth: this.editDateOfBirth,
      courseId: this.editCourseId
    };

    this.apiServiceService.updateStudent(student)
        .subscribe(data => {
          window.location.reload();
        }, err => {

        });
  }
  
  openEditStudent(data: Student) {
    console.log(data);
    this.editId = data.id;
    this.editFirstName = data.firstName;
    this.editLastName = data.lastName;
    this.editDateOfBirth = data.dateOfBirth.substring(0,10);

    this.modalReference = this.modalService.open(this.editStudentModal, this.modalOption);
  }

  openModal(teacherId) {
    this.teacherId = teacherId;
    this.modalReference = this.modalService.open(this.addContentModal, this.modalOption);
  }

  openStudentModal() {
    this.modalReference = this.modalService.open(this.addStudentModal, this.modalOption);
  }

  closeModal() {
    this.modalService.dismissAll();
  }
}
