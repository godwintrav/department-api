import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

@InputType()
export class UpdateSubDepartmentInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  name: string;
}