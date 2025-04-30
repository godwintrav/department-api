import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DepartmentsService } from './departments.service';
import { DepartmentOutput } from './types/department.output';
import { CreateDepartmentInput } from './types/create-department.input';
import { UpdateDepartmentInput } from './types/update-department.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../auth/entities/user.entity';

@Resolver(() => DepartmentOutput)
export class DepartmentsResolver {
  constructor(private readonly departmentsService: DepartmentsService) {}

  @Mutation(() => DepartmentOutput)
  @UseGuards(GqlAuthGuard)
  createDepartment(
    @Args('input') createDepartmentInput: CreateDepartmentInput,
    @CurrentUser() user: User,
  ) {
    return this.departmentsService.create(createDepartmentInput);
  }

  @Query(() => [DepartmentOutput], { name: 'departments' })
  @UseGuards(GqlAuthGuard)
  findAll() {
    return this.departmentsService.findAll();
  }

  @Query(() => DepartmentOutput, { name: 'department' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.departmentsService.findOne(id);
  }

  @Mutation(() => DepartmentOutput)
  @UseGuards(GqlAuthGuard)
  updateDepartment(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') updateDepartmentInput: UpdateDepartmentInput,
  ) {
    return this.departmentsService.update(id, updateDepartmentInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  deleteDepartment(@Args('id', { type: () => Int }) id: number) {
    return this.departmentsService.remove(id);
  }
}