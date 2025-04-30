import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, IsArray, ValidateNested, IsOptional, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
class SubDepartmentInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;
}

@InputType()
export class CreateDepartmentInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  name: string;

  @Field(() => [SubDepartmentInput], { nullable: true })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubDepartmentInput)
  subDepartments?: SubDepartmentInput[];
}