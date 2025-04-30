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