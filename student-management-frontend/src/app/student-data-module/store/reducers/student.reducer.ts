import { createReducer, on } from "@ngrx/store";
import { addStudent, getStudentsFailure, getStudentsSuccess } from "../actions/student.action";
import { Student } from "../../models/student.model";

export const initialState: Student[] = [];

export const studentReducer = createReducer(initialState,
    on(addStudent, (state, { student }) => {
        return [student, ...state]
    }),
    on(getStudentsSuccess, (state, { students }) => {
        return [...students].sort((studentOne, studentTwo) => (studentOne.id < studentTwo.id ? 1 : -1))
    }),
    on(getStudentsFailure, state => state)
)