import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Student } from '../models/student.model';
import { StudentCreateDTO, StudentType } from '../types/student.type';

const Get_All_STUDENTS = gql`
  query {
    getAllStudents {
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

@Injectable({
  providedIn: 'root',
})
export class StudentManagementService {
  allStudents: Student[] = [];
  public student: Student;
  constructor(private apollo: Apollo) {}
  public createdStudent: StudentType;
  public updatedStudent: StudentType;

  public getAllStudents = () => {
    this.apollo
      .query({
        query: gql`
          query {
            getAllStudents {
              id
              name
              gender
              address
              mobile
              dob
              age
            }
          }
        `,
      })
      .subscribe((result) => {
        this.allStudents = result.data as Student[];
        console.log(this.allStudents);
      });
  };

  public getStudents() {
    return this.apollo
      .watchQuery<any>({
        query: Get_All_STUDENTS,
      })
      .valueChanges.pipe(map((result) => result.data.getAllStudents));
  }

  public createStudent = (studentToCreate: StudentCreateDTO) => {
    this.apollo
      .mutate({
        mutation: gql`
          mutation ($student: StudentCreateDTO!) {
            createStudent(student: $student) {
              id
              name
              gender
              address
              mobile
              dob
              age
            }
          }
        `,
        variables: { student: studentToCreate },
      })
      .subscribe((result) => {
        this.createdStudent = result.data as StudentType;
      });
  };

  public updateStudent = (studentToUpdate: StudentCreateDTO, id: number) => {
    this.apollo
      .mutate({
        mutation: gql`
          mutation ($student: StudentCreateDTO!, $id: Int!) {
            updateStudent(student: $student, id: $id) {
              id
              name
              gender
              address
              mobile
              dob
              age
            }
          }
        `,
        variables: { student: studentToUpdate, studentId: id },
      })
      .subscribe((result) => {
        this.updatedStudent = result.data as StudentType;
      });
  };

  public deleteStudent = (id: number) => {
    this.apollo
      .mutate({
        mutation: gql`
          mutation ($id: Int!) {
            deleteStudent(id: $id) {
              id
            }
          }
        `,
        variables: { id: Number(id) },
      })
      .subscribe((res) => {
        console.log(res.data);
      });
  };

  // public getStudents(): Student[] {

  //     this.apollo.watchQuery<any>({
  //         query: Get_All_STUDENTS
  //     })
  //         .valueChanges.subscribe(({ data, loading }) => {
  //             console.log(loading);
  //             this.allStudents = data.getAllStudents;
  //         })
  //     return this.allStudents;
  // }
  // this.apollo.watchQuery<any>({
  //   query: Get_All_STUDENTS
  // })
  //   .valueChanges.subscribe(({ data, loading }) => {
  //     console.log(loading);
  //     this.allStudents = data.getAllStudents;
  //   })
}
