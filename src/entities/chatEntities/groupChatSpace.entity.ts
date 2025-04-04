import {Entity, Column, CreateDateColumn, ObjectLiteral, PrimaryColumn} from 'typeorm';
import {GROUP_MEMBER_ROLE} from "../../config/constants";

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
        enum: GROUP_MEMBER_ROLE,
        default: GROUP_MEMBER_ROLE.ORDINARY_MEMBER
    })
    role!: 0 | 1 | 2;

    @Column({ default: false })
    isDeleted!: boolean;
}
