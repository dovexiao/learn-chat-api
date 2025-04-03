import {Entity, Column, ObjectLiteral, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class ChatSpaceEntity implements ObjectLiteral {
    @PrimaryGeneratedColumn()
    chatSpaceId!: number;

    @Column()
    createUserId!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createTime!: Date;

    @Column({ nullable: true })
    chatSpaceAvatar!: string;

    @Column()
    chatSpaceName!: string;
}
