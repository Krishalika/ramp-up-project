import { Inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { StudentManagementService } from "../../services/student-management.service";
import { addStudent, getStudents, getStudentsSuccess } from "../actions/student.action";
import { catchError, exhaustMap, map, tap } from "rxjs/operators";
import { EMPTY } from "rxjs";

@Inject
export class StudentEffect {

    constructor(private actions: Actions, private studentManagementService: StudentManagementService) { }

    getStudents = createEffect(() =>
        this.actions.pipe(
            ofType(getStudents),
            exhaustMap(() => this.studentManagementService.getStudents().pipe(
                map((students) => getStudentsSuccess({ students })),
                catchError(() => EMPTY)
            ))
        ));

    addStudents = createEffect(() =>
        this.actions.pipe(
            ofType(addStudent),
            tap(({ student }) => this.studentManagementService.createStudent(student)),
        ), { dispatch: false })
}