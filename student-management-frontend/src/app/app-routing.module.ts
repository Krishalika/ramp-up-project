import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataGridComponent } from './student-data-module/components/data-grid/data-grid.component';
DataGridComponent
const routes: Routes = [
  { path: '', component: DataGridComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
