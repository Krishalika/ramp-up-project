import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentCreateDTO } from './dto/create-student.input';
import { UpdateStudentInput } from './dto/update-student.input';
import { Student } from './entities/student.entity';

@Injectable()
export class StudentService {

    constructor(@InjectRepository(Student)
    private studentRepository: Repository<Student>) { }

    async findAll(): Promise<Student[]> {
        return this.studentRepository.find();
    }

    async create(student: StudentCreateDTO): Promise<Student> {
        let studentToSave = this.studentRepository.create(student);
        return this.studentRepository.save(studentToSave)
    }

    update(id: number, updateStudentInput: UpdateStudentInput) {
        let student: Student = this.studentRepository.create(updateStudentInput);
        student.id = id;
        return this.studentRepository.save(student);
    }

    async findOne(id: number): Promise<Student> {
        return this.studentRepository.findOne(id);
    }

    async remove(id: number) {
        let studentToRemove = this.findOne(id);
        if (studentToRemove) {
            let ret = await this.studentRepository.delete(id);
            if (ret.affected === 1) {
                return studentToRemove;
            }
        }
        throw new NotFoundException(`Record cannot find by id ${id}`);
    }


}
