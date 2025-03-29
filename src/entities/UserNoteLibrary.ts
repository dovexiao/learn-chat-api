import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class UserNoteLibrary {
    @PrimaryColumn()
    userId!: number;

    @PrimaryColumn()
    noteLibraryId!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    joinTime!: Date;

    @Column({
        type: 'enum',
        enum: {
            MANAGE: 0,
            READ_ONLY: 1,
            CO_BUILD: 2
        },
        default: 1
    })
    permission!: 0 | 1 | 2;
}
