import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class CommentEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    createUserId!: number;

    @Column()
    postId!: number;

    @Column({ type: 'text' })
    content!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createTime!: Date;
}
