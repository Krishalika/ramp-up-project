import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class StudentCreateDTO {

    @Field(() => Int)
    id: number

    @Field()
    name: string

    @Field()
    gender: string

    @Field()
    address: string

    @Field(() => Int)
    mobile: number

    @Field()
    dob: string

    @Field(() => Int)
    age: number
}