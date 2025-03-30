import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class UserEntity {
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
