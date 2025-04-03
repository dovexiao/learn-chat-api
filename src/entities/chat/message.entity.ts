import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ObjectLiteral} from 'typeorm';

@Entity()
export class MessageEntity implements ObjectLiteral {
    @PrimaryGeneratedColumn()
    messageId!: number;

    @Column()
    chatSpaceId!: number;

    @Column({
        type: 'enum',
        enum: {
            'GROUP': 0,
            'DIRECT': 1
        },
        default: 0
    })
    chatSpaceType!: 0 | 1;

    @Column('text')
    content!: string;

    @Column({
        type: 'enum',
        enum: {
            'TEXT': 0,
            'NOTE_SHARE': 1
        },
        default: 0
    })
    contentType!: 0 | 1;

    @Column()
    createUserId!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createTime!: Date;

    @Column({
        type: 'enum',
        enum: {
            'Sent': 0,
            'NOT_SENT': 1,
            'UNREAD': 2,
            'READ': 3,
        },
        default: 0
    })
    status!: 0 | 1 | 2 | 3;

    @Column({ default: false })
    isDeleted!: boolean;
}
