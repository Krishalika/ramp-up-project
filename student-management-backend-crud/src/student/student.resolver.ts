import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { StudentCreateDTO } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { Student } from './entities/student.entity';
import { StudentService } from './student.service';

@Resolver(() => Student)
export class StudentResolver {

    constructor(private studentService: StudentService) { }

    @Query(() => [Student], { name: 'getAllStudents' })
    findAll() {
        return this.studentService.findAll();
    }

    @Mutation(() => Student, { name: 'createStudent' })
    create(@Args('student') student: StudentCreateDTO) {
        return this.studentService.create(student);
    }

    @Query(() => Student, { name: 'getSingleStudent' })
    findOne(@Args('id') id: number) {
        return this.studentService.findOne(id);
    }

    @Mutation(() => Student, { name: "updateStudent" })
    updateProject(@Args('student') student: UpdateStudentInput) {
        return this.studentService.update(student.id, student);
    }

    @Mutation(() => Student, { name: "deleteStudent" })
    removeStudent(@Args('id') id: number) {
        return this.studentService.remove(id);
    }
}
