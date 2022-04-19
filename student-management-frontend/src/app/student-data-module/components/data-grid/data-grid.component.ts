import { Component, OnInit } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { Student } from '../../models/student.model';

const Get_All_STUDENTS = gql`
query{
  getAllStudents{
    name
    id
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
  constructor(private apollo: Apollo) { }

  ngOnInit(): void {
    this.apollo.watchQuery<any>({
      query: Get_All_STUDENTS
    })
      .valueChanges.subscribe(({ data, loading }) => {
        console.log(loading);
        this.allStudents = data.getAllStudents;
      })
  }

}
