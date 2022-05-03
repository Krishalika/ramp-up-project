import { createAction, props } from "@ngrx/store";
import { Student } from "../../models/student.model";

export const addStudent = createAction('[Student] Add student', props<{ student: Student }>());

export const getStudents = createAction('[Student] Get students');

export const getStudentsSuccess = createAction('[Student] Get students successfully', props<{ students: Student[] }>());

export const getStudentsFailure = createAction('[Student] Get students fail');