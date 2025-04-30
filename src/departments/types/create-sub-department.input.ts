import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsInt, MinLength } from 'class-validator';

@InputType()
export class CreateSubDepartmentInput {
    @Field()
    @IsNotEmpty()
    @IsString()
    @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @Field(() => Int)
  @IsInt()
  departmentId: number;
}