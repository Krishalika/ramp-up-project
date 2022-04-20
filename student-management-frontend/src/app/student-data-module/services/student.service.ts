import { Injectable } from '@angular/core';
import { gql, Apollo } from 'apollo-angular';
import { Student } from '../models/student.model';

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
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  // private data: Student[] = [];
  // private counter: number = this.data.length;
  allStudents: Student[] = [];
  constructor(private apollo: Apollo) { }

  public getAllStudents(): any[] {

    this.apollo.watchQuery<any>({
      query: Get_All_STUDENTS
    })
      .valueChanges.subscribe(({ data, loading }) => {
        console.log(loading);
        this.allStudents = data.getAllStudents;
      })
    return this.allStudents;
  }
  // constructor(private apollo: Apollo) { }
  // private data: any[] = products; //products array
  // private counter: number = products.length;

  // ngOnInit(): void {
  //   this.apollo.watchQuery<any>({
  //     query: Get_All_STUDENTS
  //   }).valueChanges
  //     .subscribe(({ data, loading }) => {
  //       console.log(loading);
  //       this.data = data.getAllStudents
  //     })
  // }
  // public products(): any[] {
  //   return this.data;
  // }

  // public remove(product: any): void {
  //   const index = this.data.findIndex(
  //     ({ ProductID }) => ProductID === product.ProductID
  //   );
  //   this.data.splice(index, 1);
  // }

  // public save(product: any, isNew: boolean): void {
  //   if (isNew) {
  //     product.ProductID = this.counter++;
  //     this.data.splice(0, 0, product);
  //   } else {
  //     Object.assign(
  //       this.data.find(({ ProductID }) => ProductID === product.ProductID),
  //       product
  //     );
  //   }
  // }
}
