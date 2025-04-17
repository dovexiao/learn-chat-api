import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class TagEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    content!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createTime!: Date;

    @Column()
    participants!: number;
}
