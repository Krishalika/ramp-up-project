import { Component, OnInit } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

const Get_All_STUDENTS = gql`
query{
  getAllStudents{
    id
    name
    gender
    mobile
    dob
    age
  }
}
`;

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit {

  allStudents: Student[] = [];
  constructor(private apollo: Apollo, private studentService: StudentService) { }

  ngOnInit():void {
    // this.studentService.getAllStudents();
    this.allStudents =  this.studentService.getAllStudents();
    console.log(this.studentService.getAllStudents());
    
    // this.apollo.watchQuery<any>({
    //   query: Get_All_STUDENTS
    // })
    //   .valueChanges.subscribe(({ data, loading }) => {
    //     console.log(loading);
    //     this.allStudents = data.getAllStudents;
    //   })
  }

}
