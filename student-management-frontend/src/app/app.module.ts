import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DataGridComponent } from './student-data-module/components/data-grid/data-grid.component';
import { GridModule } from '@progress/kendo-angular-grid';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { studentReducer } from './student-data-module/store/reducers/student.reducer';
import { StoreModule } from '@ngrx/store';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { FileUploadComponent } from './student-data-module/components/file-upload/file-upload.component';
import { HomeComponent } from './student-data-module/containers/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const config: SocketIoConfig = { url: 'http://localhost:4001', options: {} };

@NgModule({
  declarations: [AppComponent, DataGridComponent, FileUploadComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    GridModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    StoreModule.forRoot({
      student: studentReducer,
    }),
    NotificationModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  // schemas: [
  //   CUSTOM_ELEMENTS_SCHEMA
  // ],
})
export class AppModule { }
