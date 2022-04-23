import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AddEvent, GridComponent } from '@progress/kendo-angular-grid';
import { gql, Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { getStudents } from '../../store/actions/student.action';
import { AppState } from '../../store/states/student.state';

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

  students: Observable<Student[]>;
  public formGroup!: FormGroup;
  private isNew = false;
  private editedRowIndex: number;

  constructor(private apollo: Apollo, private studentService: StudentService, private store: Store<AppState>) { }

  // constructor(private store: Store<AppState>) {
  //   this.students = store.select('student')
  // }

  ngOnInit(): void {
    // this.studentService.getAllStudents();
    // this.allStudents =  this.studentService.getAllStudents();
    // console.log(this.studentService.getAllStudents());
    // this.store.dispatch(getStudents());
    // this.view = this.service.products();

    this.apollo.watchQuery<any>({
      query: Get_All_STUDENTS
    })
      .valueChanges.subscribe(({ data, loading }) => {
        console.log(loading);
        this.allStudents = data.getAllStudents;
      })
  }

  public addHandler({ sender }: AddEvent): void {
    this.closeEditor(sender);

    this.formGroup = formGroup({
      id: "",
      name: "",
      gender: "",
      address: "",
      dob: "",
      age: "",
      mobile: "",
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

  public get isInEditingMode(): boolean {
    return this.editedRowIndex !== undefined || this.isNew;
  }
}
