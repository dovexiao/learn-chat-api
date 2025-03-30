import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class NoteOperationRecordEntity {
    @PrimaryGeneratedColumn()
    recordId!: number;

    @Column()
    noteId!: number;

    @Column()
    operatorId!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    operationTime!: Date;

    @Column({
        type: 'enum',
        enum: {
            INITIAL: 0,
            SAVE: 1,
            SWITCH: 2,
            SAVE_DRAFT: 3,
        },
        default: 0
    })
    operationType!: 0 | 1 | 2 | 3;

    @Column({ type: 'text' })
    operationDetails!: string;
}
