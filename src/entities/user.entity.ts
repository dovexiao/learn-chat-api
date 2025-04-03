import { Entity, PrimaryGeneratedColumn, Column, ObjectLiteral } from 'typeorm';

@Entity()
export class UserEntity implements ObjectLiteral {
    @PrimaryGeneratedColumn()
    userId!: number;

    @Column()
    username!: string;

    @Column()
    password!: string;

    @Column({ nullable: true })
    nickname!: string;

    @Column({ nullable: true })
    avatar!: string;

    @Column()
    permissions!: string;
}
