import {Entity, Column, CreateDateColumn, ObjectLiteral, PrimaryColumn} from 'typeorm';

@Entity()
export class GroupChatSpaceEntity implements ObjectLiteral {
    @PrimaryColumn()
    chatSpaceId!: number;

    @PrimaryColumn()
    userId!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    joinTime!: Date;

    @Column({ nullable: true })
    latestMessage!: string;

    @Column({ default: 0 })
    unreadCount!: number;

    @Column({
        type: 'enum',
        enum: {
            'ADMIN': 0,
            'DEPUTY_ADMIN': 1,
            'ORDINARY_MEMBER' : 2
        },
        default: 2
    })
    role!: 0 | 1 | 2;

    @Column({ default: false })
    isDeleted!: boolean;
}
