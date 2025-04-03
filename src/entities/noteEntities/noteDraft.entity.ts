import {Entity, PrimaryGeneratedColumn, Column, ObjectLiteral} from 'typeorm';

@Entity()
export class NoteDraftEntity implements ObjectLiteral {
    @PrimaryGeneratedColumn()
    draftId!: number;

    @Column()
    creatorId!: number;

    @Column()
    noteId!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createTime!: Date;

    @Column({ type: 'text' })
    draftContent!: string;
}
