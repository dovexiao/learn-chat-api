import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class NoteUpdateEvent {
    @PrimaryGeneratedColumn()
    eventId!: number;

    @Column()
    noteId!: number;

    @Column()
    updaterId!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updateTime!: Date;

    @Column({ type: 'text' })
    updateContent!: string;

    @Column({
        type: 'enum',
        enum: {
            INITIAL: 0,
            SAVE: 1,
        },
        default: 0
    })
    updateType!: 0 | 1;

    @Column()
    updateSourceId!: number;
}
