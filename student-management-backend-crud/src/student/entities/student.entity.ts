import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Student {

    @Field(() => Int)
    @PrimaryColumn()
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