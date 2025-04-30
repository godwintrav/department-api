import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../auth/entities/user.entity';
import { SubDepartmentOutput } from './types/sub-department.output';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { CreateSubDepartmentInput } from './types/create-sub-department.input';
import { UpdateSubDepartmentInput } from './types/update-sub-department.input';

@Resolver(() => SubDepartmentOutput)
export class SubDepartmentsResolver {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Mutation(() => SubDepartmentOutput)
  @UseGuards(GqlAuthGuard)
  createSubDepartment(
    @Args('input') createSubDepartmentInput: CreateSubDepartmentInput,
    @CurrentUser() user: User,
  ) {
    return this.departmentsService.createSubDepartment(createSubDepartmentInput);
  }

  @Query(() => [SubDepartmentOutput], { name: 'subDepartments' })
  @UseGuards(GqlAuthGuard)
  findAllSubDepartments() {
    return this.departmentsService.findAllSubDepartments();
  }

  @Query(() => [SubDepartmentOutput], { name: 'subDepartmentsByDepartment' })
  @UseGuards(GqlAuthGuard)
  findSubDepartmentsByDepartment(@Args('departmentId', { type: () => Int }) departmentId: number) {
    return this.departmentsService.findSubDepartmentsByDepartment(departmentId);
  }

  @Query(() => SubDepartmentOutput, { name: 'subDepartment' })
  @UseGuards(GqlAuthGuard)
  findOneSubDepartment(@Args('id', { type: () => Int }) id: number) {
    return this.departmentsService.findOneSubDepartment(id);
  }

  @Mutation(() => SubDepartmentOutput)
  @UseGuards(GqlAuthGuard)
  updateSubDepartment(@Args('input') updateSubDepartmentInput: UpdateSubDepartmentInput) {
    return this.departmentsService.updateSubDepartment(updateSubDepartmentInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  deleteSubDepartment(@Args('id', { type: () => Int }) id: number) {
    return this.departmentsService.removeSubDepartment(id);
  }
}