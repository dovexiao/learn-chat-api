import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class NoteDraft {
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
