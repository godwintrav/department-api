import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';
import { CreateDepartmentInput } from './types/create-department.input';
import { UpdateDepartmentInput } from './types/update-department.input';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
    @InjectRepository(SubDepartment)
    private subDepartmentRepository: Repository<SubDepartment>,
  ) {}

  async create(createDepartmentInput: CreateDepartmentInput): Promise<Department> {
    const department = this.departmentRepository.create({
      name: createDepartmentInput.name,
    });

    if (createDepartmentInput.subDepartments && createDepartmentInput.subDepartments.length > 0) {
      department.subDepartments = createDepartmentInput.subDepartments.map((subDept) =>
        this.subDepartmentRepository.create({ name: subDept.name }),
      );
    }

    return this.departmentRepository.save(department);
  }

  async findAll(): Promise<Department[]> {
    return this.departmentRepository.find({ relations: ['subDepartments'] });
  }

  async findOne(id: number): Promise<Department> {
    const department = await this.departmentRepository.findOne({
      where: { id },
      relations: ['subDepartments'],
    });
    if (!department) {
      throw new NotFoundException(`Department with ID ${id} not found`);
    }
    return department;
  }

  async update(id: number, updateDepartmentInput: UpdateDepartmentInput): Promise<Department> {
    const department = await this.findOne(id);
    department.name = updateDepartmentInput.name;
    return this.departmentRepository.save(department);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.departmentRepository.delete(id);
    if(!result || !result.affected){
        return false;
    }
    return result.affected > 0;
  }
}