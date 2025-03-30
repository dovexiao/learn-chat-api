import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class ChatSpaceEntity {
    @PrimaryColumn()
    chatSpaceId!: number;

    @PrimaryColumn()
    userId!: number;

    @Column({ nullable: true })
    latestMessage!: string;

    @Column({ default: 0 })
    unreadMessageCount!: number;

    @Column({ nullable: true })
    spaceAvatar!: string;

    @Column()
    spaceName!: string;
}
