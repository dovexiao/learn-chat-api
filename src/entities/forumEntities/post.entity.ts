import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class PostEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    createUserId!: number;

    @Column({ type: 'text' })
    content!: string;

    @Column()
    tags!: string;

    @Column({ type: 'text' })
    images!: string;

    @Column()
    likes!: number;

    @Column()
    views!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createTime!: Date;

    @Column()
    isDeleted!: boolean;
}
