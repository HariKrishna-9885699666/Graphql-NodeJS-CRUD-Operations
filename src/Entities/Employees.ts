import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class Employees extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column("text")
    firstName: string

    @Column("text")
    lastName: string

    @Column("int")
    age: number

    @Column("text")
    phoneNumber: string;

    @Column("text")
    email: string;

    @Column("text")
    jobLocation: string;
}