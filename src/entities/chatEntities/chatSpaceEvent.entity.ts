import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ObjectLiteral} from 'typeorm';

@Entity()
export class ChatSpaceEventEntity implements ObjectLiteral {
    @PrimaryGeneratedColumn()
    eventId!: number;

    @Column()
    eventType!: string;

    @Column()
    creatorId!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createTime!: Date;

    @Column()
    receiverId!: number;

    @Column('text')
    content!: string;
}
