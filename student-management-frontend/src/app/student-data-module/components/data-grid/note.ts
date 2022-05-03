// import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
// import { FormGroup, FormControl, Validators } from "@angular/forms";
// import { AddEvent, CellClickEvent, GridComponent } from '@progress/kendo-angular-grid';
// import { StudentService } from '../../services/student.service';
// import { gql, Apollo } from 'apollo-angular';
// import { Student } from '../../models/student.model';

// const Get_All_STUDENTS = gql`
// query{
//   getAllStudents{
//     name
//     id
//     gender
//     mobile
//     dob
//     age
//   }
// }
// `;

// const formGroup = (dataItem) =>
//   new FormGroup({
//     Discontinued: new FormControl(dataItem.Discontinued),
//     ProductID: new FormControl(dataItem.ProductID),
//     ProductName: new FormControl(dataItem.ProductName, Validators.required),
//     UnitPrice: new FormControl(dataItem.UnitPrice),
//     UnitsInStock: new FormControl(
//       dataItem.UnitsInStock,
//       Validators.compose([
//         Validators.required,
//         Validators.pattern("^[0-9]{1,3}"),
//       ])
//     ),
//   });

// const hasClass = (el, className) => new RegExp(className).test(el.className);

// const isChildOf = (el, className) => {
//   while (el && el.parentElement) {
//     if (hasClass(el.parentElement, className)) {
//       return true;
//     }
//     el = el.parentElement;
//   }
//   return false;
// };

// @Component({
//   selector: 'app-data-grid',
//   templateUrl: './data-grid.component.html',
//   styleUrls: ['./data-grid.component.scss']
// })
// export class DataGridComponent implements OnInit {

//   public formGroup: FormGroup;
//   public view: any[];
//   @ViewChild(GridComponent) private grid: GridComponent;
//   private editedRowIndex: number;
//   private isNew = false;

//   public get isInEditingMode(): boolean {
//     return this.editedRowIndex !== undefined || this.isNew;
//   }

//   constructor(private studentService: StudentService, private renderer: Renderer2, private apollo: Apollo) { }


//   public ngOnInit(): void {
//     this.view = this.studentService.products();
//     this.renderer.listen("document", "click", ({ target }) => {
//       if (!isChildOf(target, "k-grid")) {
//         this.saveCurrent();
//       }
//     });
//   }

//   public addHandler({ sender }: AddEvent): void {
//     this.closeEditor(sender);

//     this.formGroup = formGroup({
//       Discontinued: false,
//       ProductName: "",
//       UnitPrice: 0,
//       UnitsInStock: "",
//     });

//     this.isNew = true;
//     sender.addRow(this.formGroup);
//   }

//   public editHandler({
//     sender,
//     columnIndex,
//     rowIndex,
//     dataItem,
//   }: CellClickEvent): void {
//     if (this.formGroup && !this.formGroup.valid) {
//       return;
//     }

//     // this.saveRow();
//     this.formGroup = formGroup(dataItem);
//     this.editedRowIndex = rowIndex;

//     sender.editRow(rowIndex, this.formGroup, { columnIndex });
//   }

//   public cancelHandler(): void {
//     this.closeEditor(this.grid, this.editedRowIndex);
//   }

//   public saveCurrent(): void {
//     if (this.formGroup && !this.formGroup.valid) {
//       return;
//     }

//     // this.saveRow();
//   }

//   private closeEditor(
//     grid: GridComponent,
//     rowIndex: number = this.editedRowIndex
//   ): void {
//     this.isNew = false;
//     grid.closeRow(rowIndex);
//     this.editedRowIndex = undefined;
//     this.formGroup = undefined;
//   }

//   // private saveRow(): void {
//   //   if (this.isInEditingMode) {
//   //     this.studentService.save(this.formGroup.value, this.isNew);
//   //   }

//   //   this.closeEditor(this.grid);
//   // }

// }
