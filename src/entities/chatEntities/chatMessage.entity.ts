import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ObjectLiteral} from 'typeorm';
import {MESSAGE_CONTENT_TYPE, MESSAGE_STATUS} from "../../config/constants";

@Entity()
export class ChatMessageEntity implements ObjectLiteral {
    @PrimaryGeneratedColumn()
    messageId!: number;

    @Column()
    chatSpaceId!: number;

    @Column('text')
    content!: string;

    @Column({
        type: 'enum',
        enum: MESSAGE_CONTENT_TYPE,
        default: MESSAGE_CONTENT_TYPE.TEXT
    })
    contentType!: 0 | 1 | 2;

    @Column()
    createUserId!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createTime!: Date;

    @Column({
        type: 'enum',
        enum: MESSAGE_STATUS,
        default: MESSAGE_STATUS.SENT
    })
    status!:  0 | 1 | 2 | 3;

    @Column({ default: false })
    isDeleted!: boolean;
}
