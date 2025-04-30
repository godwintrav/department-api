import { Field, ObjectType, Int } from '@nestjs/graphql';
import { SubDepartmentOutput } from './sub-department.output';



@ObjectType()
export class DepartmentOutput {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [SubDepartmentOutput], { nullable: true, defaultValue: [] })
  subDepartments?: SubDepartmentOutput[];
}

@ObjectType()
export class PaginationResponse {
  @Field(() => Int)
  total: number;

  @Field(() => Int)
  page: number;

  @Field(() => Int)
  limit: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Boolean)
  hasNext: boolean;

  @Field(() => Boolean)
  hasPrev: boolean;
}

@ObjectType()
export class DepartmentsResponse {
  @Field(() => [DepartmentOutput])
  departments: DepartmentOutput[];

  @Field(() => PaginationResponse)
  pagination: PaginationResponse;
}