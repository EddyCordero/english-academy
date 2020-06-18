import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TeachersComponent } from './teachers/teachers.component';
import { TeacherDetailComponent } from './teacher-detail/teacher-detail.component';


const routes: Routes = [
  {path: '', component: TeachersComponent},
  {path: 'detail-teacher/:id', component: TeacherDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
