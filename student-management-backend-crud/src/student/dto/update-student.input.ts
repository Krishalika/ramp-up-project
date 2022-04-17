import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateStudentInput {

    @Field()
    uuid: string;

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

}