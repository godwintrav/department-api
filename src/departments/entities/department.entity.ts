import { Entity, PrimaryGeneratedColumn, Column, OneToMany, Index } from 'typeorm';
import { SubDepartment } from './sub-department.entity';

@Entity()
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({unique: true})
  name: string;

  @OneToMany(() => SubDepartment, (subDepartment) => subDepartment.department, {
    cascade: true,
  })
  subDepartments: SubDepartment[];
}