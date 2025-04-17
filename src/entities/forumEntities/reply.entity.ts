import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm';

@Entity()
export class RelyEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    createUserId!: number;

    @Column()
    commentId!: number;

    @Column()
    repliedUserId!: number;

    @Column({ type: 'text' })
    content!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createTime!: Date;
}
