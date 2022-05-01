import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: 'student' })
export class StudentEntity {

    @PrimaryColumn()
    id: number

    @Column()
    name: string

    @Column()
    gender: string

    @Column()
    address: string

    @Column()
    mobile: number

    @Column()
    dob: string

    @Column()
    age: number

}