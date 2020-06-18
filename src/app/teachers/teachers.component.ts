import { ApiServiceService } from './../provider/api-service.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Teacher } from '../dtos/teacher';
import { NgbModalOptions, NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.css']
})
export class TeachersComponent implements OnInit {
  
  public teachers: Teacher[] = [];
  public addFirstName: string;
  public addLastName: string;
  public addDateOfBirth: string;
  
  public editFirstName: string;
  public editLastName: string;
  public editDateOfBirth: string;
  
  public modalOption: NgbModalOptions = {};
  public modalReference: NgbModalRef;

  @ViewChild('AddContentModal', {static: false}) addContentModal: NgbModalRef;
  @ViewChild('EditContentModal', {static: false}) editContentModal: NgbModalRef;
  editId: number;

 
  constructor(
              private apiServiceService: ApiServiceService,
              private modalService: NgbModal
            ) { }

  ngOnInit(): void {
    this.modalOption.backdrop = 'static';
    this.modalOption.keyboard = false;
    this.modalOption.size = 'lg';

    this.getTeachers();
  }

  getTeachers() {
    this.apiServiceService.getTeachers()
        .subscribe(data => {
          this.teachers = data;
          console.log(this.teachers);
        }, err => {

        });
  }

  deleteTeacher(id: number) {
    var isPositive = confirm("Esta Seguro que desea eliminar este Maestro?");

    if(isPositive)
    {
      this.apiServiceService.delete(id)
        .subscribe(data => {
          window.location.reload();
        }, err => {

        });
    }
  }

  addTeacher() {
    let param: Teacher = {
      firstName: this.addFirstName,
      lastName: this.addLastName,
      dateOfBirth: this.addDateOfBirth
    };    

    this.apiServiceService.createTeacher(param)
        .subscribe(data => {
          window.location.reload();
        }, err => {

        });
  }

  editTeacher() {
    let param: Teacher = {
      id: this.editId,
      firstName: this.editFirstName,
      lastName: this.editLastName,
      dateOfBirth: this.editDateOfBirth
    };

    this.apiServiceService.updateTeacher(param)
        .subscribe(data => {
          window.location.reload();
        }, err => {

        });
  }
  
  openEditTeacher(data: Teacher) {
    console.log(data);
    this.editId = data.id;
    this.editFirstName = data.firstName;
    this.editLastName = data.lastName;
    this.editDateOfBirth = data.dateOfBirth.substring(0,10);

    this.modalReference = this.modalService.open(this.editContentModal, this.modalOption);
  }

  openModal() {
    this.modalReference = this.modalService.open(this.addContentModal, this.modalOption);
  }

  closeModal() {
    this.modalService.dismissAll();
  }

}
