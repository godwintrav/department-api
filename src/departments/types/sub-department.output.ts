import { Field, ObjectType, Int } from '@nestjs/graphql';

@ObjectType()
export class SubDepartmentOutput {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;
}