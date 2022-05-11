import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Student } from '../models/student.model';
import {
  StudentCreateDTO,
  StudentType,
  UpdateStudentInput,
} from '../types/student.type';

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
  constructor(private apollo: Apollo) { }
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
      });
    return this.allStudents;
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
        refetchQueries: [{ query: Get_All_STUDENTS }],
        variables: { student: studentToCreate },
      })
      .subscribe((result) => {
        this.createdStudent = result.data as StudentType;
      });
  };

  public updateStudent = (studentToUpdate: UpdateStudentInput) => {
    this.apollo
      .mutate({
        mutation: gql`
          mutation ($student: UpdateStudentInput!) {
            updateStudent(student: $student) {
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
        refetchQueries: [{ query: Get_All_STUDENTS }],
        variables: { student: studentToUpdate },
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
        refetchQueries: [{ query: Get_All_STUDENTS }],
        variables: { id: Number(id) },
      })
      .subscribe((res) => {
        console.log(res.data);
      });
  };

}
