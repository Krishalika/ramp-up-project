import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AddEvent,
  GridComponent,
  GridDataResult,
  PageChangeEvent,
} from '@progress/kendo-angular-grid';
import { gql, Apollo } from 'apollo-angular';
import { Student } from '../../models/student.model';
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
  public gridView: GridDataResult;
  newStudent: StudentCreateDTO;
  updatedStudent: StudentCreateDTO;
  public formGroup!: FormGroup;
  private isNew = false;
  private editedRowIndex: number;
  @ViewChild(GridComponent) private grid: GridComponent;
  page = 1;
  public pageSize = 5;
  public skip = 0;

  constructor(
    private apollo: Apollo,
    private studentService: StudentManagementService,
    private notificationService: NotificationService,
    private socketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.getAll();

    this.loadItems(this.allStudents);
    this.socketService.listenForMessages().subscribe((message) => {
      console.log('Incoming notification: ', message);
      this.showNotificationInfo(message);
    });
  }

  public getAll() {
    this.apollo
      .watchQuery<any>({
        query: Get_All_STUDENTS,
      })
      .valueChanges.subscribe(({ data, loading }) => {
        console.log(loading);
        this.allStudents = data.getAllStudents;
      });
    return this.allStudents;
  }

  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadItems(this.allStudents);
  }

  private loadItems(item: any[]): void {
    this.gridView = {
      data: item.slice(this.skip, this.skip + this.pageSize),
      total: item.length,
    };
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

    try {
      this.studentService.createStudent(this.newStudent);
      this.showNotificationInfo('Record added');
    } catch (e) {
      this.showNotificationInfo('Error in saving');
    }

    this.clearForm();
  }

  public showNotificationInfo(customMessage: string): void {
    this.notificationService.show({
      content: customMessage,
      animation: { type: 'slide', duration: 400 },
      position: { horizontal: 'center', vertical: 'bottom' },
      type: { style: 'info', icon: true },
      closable: true,
    });
  }
  public removeStudent(item) {
    const id = item.id;

    try {
      this.studentService.deleteStudent(parseInt(id));
      this.showNotificationInfo('Record removed');
    } catch (e) {
      this.showNotificationInfo('Error in removing record');
    }
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

    try {
      this.studentService.updateStudent(this.updatedStudent);
      this.showNotificationInfo('Record updated');
    } catch (e) {
      this.showNotificationInfo('Error in updating record');
    }
  }

  editHandler({ sender, rowIndex, dataItem }) {
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

    sender.editRow(rowIndex, group);
  }

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
}
