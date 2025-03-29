import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Message {
    @PrimaryGeneratedColumn()
    messageId!: number;

    @Column()
    chatSpaceId!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createTime!: Date;

    @Column()
    createUserId!: number;

    @Column()
    receiveUserId!: number;

    @Column({ default: false })
    receiveUserReadStatus!: boolean;

    @Column('text')
    messageContent!: string;
}
