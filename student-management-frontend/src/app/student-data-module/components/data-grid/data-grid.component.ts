import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AddEvent, GridComponent } from '@progress/kendo-angular-grid';
import { gql, Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Student } from '../../models/student.model';
import { AppState } from '../../store/states/student.state';
import * as moment from 'moment';
import { StudentManagementService } from '../../services/student-management.service';
// import { Int } from "type-graphql";
import { StudentCreateDTO } from '../../types/student.type';

const Get_All_STUDENTS = gql`
query{
  getAllStudents{
    id
    name
    gender
    address
    mobile
    dob
    age
  }
}
`;

const saveRegistration = gql`
        mutation createStudent( 
          $id: Int!
          $name: String!
          $gender: String!
          $address: String!
          $mobile: Int!
          $dob: String!
          $age: Int!
        ) {
          createStudent(
            id: $id
            name: $name
            gender: $gender
            address: $address
            mobile: $mobile
            dob: $dob
            age: $age
          ) 
          {id
          }
        }
      `;

const ADD_ST = gql`
    mutation createStudent($student: StudentCreateDTO!) {
      createStudent(student: $student){
    id
    name
    gender
    address
    mobile
    dob
    age
      }
    }
    `;



const formGroup = (dataItem) =>
  new FormGroup({
    id: new FormControl(dataItem.id, Validators.required),
    name: new FormControl(dataItem.name, Validators.required),
    gender: new FormControl(dataItem.gender, Validators.required),
    address: new FormControl(dataItem.address, Validators.required),
    dob: new FormControl(dataItem.dob, Validators.required),
    age: new FormControl(dataItem.age),
    mobile: new FormControl(
      dataItem.mobile,
      Validators.compose([
        Validators.required,
        // Validators.pattern("^[0-9]{1,3}"),
      ])
    ),
  });

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss']
})
export class DataGridComponent implements OnInit {

  allStudents: Student[] = [];
  newStudent: StudentCreateDTO;
  students: Observable<Student[]>;
  public formGroup!: FormGroup;
  private isNew = false;
  private editedRowIndex: number;
  @ViewChild(GridComponent) private grid: GridComponent;
  courses: Observable<Student[]>;

  studentFormGroup = formGroup({
    id: 0,
    name: "",
    gender: "",
    address: "",
    dob: "",
    age: 0,
    mobile: 0,
  });
  studentForms = {
    id: 0,
    name: "",
    gender: "",
    address: "",
    dob: "",
    age: 0,
    mobile: 0,
  };

  constructor(private apollo: Apollo, private studentService: StudentManagementService, private store: Store<AppState>) { }

  ngOnInit(): void {

    this.apollo.watchQuery<any>({
      query: Get_All_STUDENTS
    })
      .valueChanges.subscribe(({ data, loading }) => {
        console.log(loading);
        this.allStudents = data.getAllStudents;
      })

  }

  public saveCurrent() {

    // this.newStudent = {
    //   id: 23,
    //   name: "sample",
    //   gender: "female",
    //   address: "Colombo",
    //   mobile: 781234568,
    //   dob: "212324",
    //   age: 12
    // }

    this.newStudent = {
      id: this.studentForms.id,
      name: this.studentForms.name,
      gender: this.studentForms.gender,
      address: this.studentForms.address,
      mobile: this.studentForms.mobile,
      dob: this.studentForms.dob,
      age: this.studentForms.age
    }

    this.studentService.createStudent(this.newStudent);

  }

  public addHandler({ sender }: AddEvent): void {
    this.closeEditor(sender);

    this.formGroup = formGroup({
      id: 0,
      name: "",
      gender: "",
      address: "",
      dob: "",
      age: 0,
      mobile: 0,
    });

    this.isNew = true;
    sender.addRow(this.formGroup);
  }

  private closeEditor(
    grid: GridComponent,
    rowIndex: number = this.editedRowIndex
  ): void {
    this.isNew = false;
    grid.closeRow(rowIndex);
    this.editedRowIndex = undefined;
    this.formGroup = undefined;
  }
  public cancelHandler(): void {
    this.closeEditor(this.grid, this.editedRowIndex);
  }

  public get isInEditingMode(): boolean {
    return this.editedRowIndex !== undefined || this.isNew;
  }



  public save() {

    this.apollo.mutate({
      mutation: ADD_ST,
      variables: this.newStudent
    }).subscribe(({ data }) => {
      console.log('got data', data);
    }, (error) => {
      console.log('there was an error sending the query', error);
    });
  }
  //   this.apollo.mutate({
  //     mutation: UPVOTE_POST,
  //     variables: {
  //       id: 23,
  //       name: "sample",
  //       gender: "female",
  //       address: "Colombo",
  //       mobile: 781234568,
  //       dob: "212324",
  //       age: 12
  //     }
  //   }).subscribe(({ data }) => {
  //     console.log('got data', data);
  //   }, (error) => {
  //     console.log('there was an error sending the query', error);
  //   });
  // }

  // this.apollo.mutate({
  //   mutation: Post_SAVE_STUDENT,
  //   variables: {
  //     student: {
  //       id: Number(this.studentForms.id),
  //       address: this.studentForms.address,
  //       age: Number(this.studentForms.age),
  //       dob: this.studentForms.dob,
  //       gender: this.studentForms.gender,
  //       mobile: this.studentForms.mobile,
  //       name: this.studentForms.name,
  //     }
  //   }
  // }).subscribe(({ data }) => {
  //   let students = Object.assign([], this.allStudents)
  //   students.unshift(data["Save"]);
  //   this.allStudents = students;
  // })


  public calculateAge(birthdate: any): number {
    return moment().diff(birthdate, 'years');
  }

  getAge(birthDate: Date): number {
    const ageTilNowInMilliseconds = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageTilNowInMilliseconds);
    return Math.abs(ageDate.getUTCFullYear() - 1970); // Because computers count the today date from the 1st of January 1970
  }
}


