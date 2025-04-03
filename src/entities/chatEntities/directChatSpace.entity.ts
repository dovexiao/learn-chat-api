import {Entity, PrimaryGeneratedColumn, Column, ObjectLiteral, PrimaryColumn} from 'typeorm';

@Entity()
export class DirectChatSpaceEntity implements ObjectLiteral {
    @PrimaryColumn()
    chatSpaceId!: number;

    @PrimaryColumn()
    userId!: number;

    @Column()
    contactUserId!: number;

    @Column({ nullable: true })
    latestMessage!: string;

    @Column({ default: 0 })
    unreadCount!: number;

    @Column({ default: false })
    isDeleted!: boolean;
}
