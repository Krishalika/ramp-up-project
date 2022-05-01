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
import { StudentCreateDTO } from '../../types/student.type';
import { NotificationService } from '@progress/kendo-angular-notification';
import { WebSocketService } from '../../services/websocket.service';

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
        Validators.pattern('^[0-9]{1,11}'),
      ])
    ),
  });

@Component({
  selector: 'app-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.scss'],
})
export class DataGridComponent implements OnInit {
  allStudents: Student[] = [];
  newStudent: StudentCreateDTO;
  updatedStudent: StudentCreateDTO;
  students: Observable<Student[]>;
  public formGroup!: FormGroup;
  private isNew = false;
  private editedRowIndex: number;
  @ViewChild(GridComponent) private grid: GridComponent;

  public notification: string = '';

  constructor(
    private apollo: Apollo,
    private studentService: StudentManagementService,
    private store: Store<AppState>,
    private notificationService: NotificationService,
    private socketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery<any>({
        query: Get_All_STUDENTS,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        console.log(loading);
        this.allStudents = data.getAllStudents;
      });
  }

  public saveCurrent() {
    const id = this.formGroup.value.id;
    const name = this.formGroup.value.name;
    const gender = this.formGroup.value.gender;
    const address = this.formGroup.value.address;
    const mobile = this.formGroup.value.mobile;
    const dob = this.formGroup.value.dob;
    const age = this.formGroup.value.age;
    this.newStudent = {
      id: parseInt(id),
      name: name,
      gender: gender,
      address: address,
      mobile: parseInt(mobile),
      dob: dob,
      age: parseInt(age),
    };

    this.studentService.createStudent(this.newStudent);

    console.log(
      'The printed msg: ',
      this.socketService.notification$
    );

    // this.studentService.receiveNotification().subscribe((message: string) => {
    //   //-----------error
    //   message = message;
    // });
    // this.showNotification(message);
    this.clearForm();
  }

  public showNotification(customMessage: string): void {
    this.notificationService.show({
      content: customMessage,
      // cssClass: 'button-notification',
      animation: { type: 'slide', duration: 400 },
      position: { horizontal: 'center', vertical: 'bottom' },
      type: { style: 'success', icon: true },
      closable: true,
    });
  }

  public removeStudent(item) {
    const id = item.id;
    this.studentService.deleteStudent(parseInt(id));
  }

  public updateStudent(item) {
    const id = item.id;
    const name = item.name;
    const gender = item.gender;
    const address = item.address;
    const mobile = item.mobile;
    const dob = item.dob;
    const age = item.age;

    console.log('ID is: ', item.id);

    this.updatedStudent = {
      id: parseInt(id),
      name: name,
      gender: gender,
      address: address,
      mobile: parseInt(mobile),
      dob: dob,
      age: parseInt(age),
    };

    this.studentService.updateStudent(this.updatedStudent);
  }

  editHandler({ sender, rowIndex, dataItem }) {
    // define all editable fields validators and default values
    const group = new FormGroup({
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
          Validators.pattern('^[0-9]{1,11}'),
        ])
      ),
    });

    // put the row in edit mode, with the `FormGroup` build above
    sender.editRow(rowIndex, group);
  }

  // editRow(row) {
  //   this.allStudents
  //     .filter((row) => row.isEditable)
  //     .map((r) => {
  //       r.isEditable = false;
  //       return r;
  //     });
  //   row.isEditable = true;
  // }

  private clearForm(): void {
    this.formGroup.reset();
  }

  public addHandler({ sender }: AddEvent): void {
    this.closeEditor(sender);

    this.formGroup = formGroup({
      id: 0,
      name: '',
      gender: '',
      address: '',
      dob: '',
      age: 0,
      mobile: 0,
    });

    this.isNew = true;
    sender.addRow(this.formGroup);
  }

  canceledHandler({ sender, rowIndex }) {
    // close the editor for the given row
    sender.closeRow(rowIndex);
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

  public calculateAge(birthdate: any): number {
    return moment().diff(birthdate, 'years');
  }

  getAge(birthDate: Date): number {
    const ageTilNowInMilliseconds = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageTilNowInMilliseconds);
    return Math.abs(ageDate.getUTCFullYear() - 1970); // Because computers count the today date from the 1st of January 1970
  }
}
