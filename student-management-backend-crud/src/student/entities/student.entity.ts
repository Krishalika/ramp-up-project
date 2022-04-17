import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Student {

    @Field()
    @PrimaryGeneratedColumn('uuid')
    uuid: string

    @Field(() => Int)
    @Column()
    id: number

    @Field()
    @Column()
    name: string

    @Field()
    @Column()
    gender: string

    @Field()
    @Column()
    address: string

    @Field(() => Int)
    @Column()
    mobile: number

    @Field()
    @Column()
    dob: string

    @Field(() => Int)
    @Column()
    age: number

}