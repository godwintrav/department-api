import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Department } from './entities/department.entity';
import { SubDepartment } from './entities/sub-department.entity';
import { CreateDepartmentInput } from './types/create-department.input';
import { UpdateDepartmentInput } from './types/update-department.input';
import { UpdateSubDepartmentInput } from './types/update-sub-department.input';
import { CreateSubDepartmentInput } from './types/create-sub-department.input';

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

  async createSubDepartment(createSubDepartmentInput: CreateSubDepartmentInput): Promise<SubDepartment> {
    const department = await this.findOne(createSubDepartmentInput.departmentId);
    const subDepartment = this.subDepartmentRepository.create({
      name: createSubDepartmentInput.name,
      department,
    });
    return this.subDepartmentRepository.save(subDepartment);
  }

  async findAllSubDepartments(): Promise<SubDepartment[]> {
    return this.subDepartmentRepository.find({ relations: ['department'] });
  }

  async findOneSubDepartment(id: number): Promise<SubDepartment> {
    const subDepartment = await this.subDepartmentRepository.findOne({
      where: { id },
      relations: ['department'],
    });
    if (!subDepartment) {
      throw new NotFoundException(`Sub-department with ID ${id} not found`);
    }
    return subDepartment;
  }

  async updateSubDepartment(updateSubDepartmentInput: UpdateSubDepartmentInput): Promise<SubDepartment> {
    const subDepartment = await this.findOneSubDepartment(updateSubDepartmentInput.id);
    subDepartment.name = updateSubDepartmentInput.name;
    return this.subDepartmentRepository.save(subDepartment);
  }

  async removeSubDepartment(id: number): Promise<boolean> {
    const result = await this.subDepartmentRepository.delete(id);
    if(!result || !result.affected){
        return false;
    }
    return result.affected > 0;
  }

  async findSubDepartmentsByDepartment(departmentId: number): Promise<SubDepartment[]> {
    return this.subDepartmentRepository.find({
      where: { department: { id: departmentId } },
    });
  }
}