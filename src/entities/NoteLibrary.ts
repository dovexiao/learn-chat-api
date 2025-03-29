import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class NoteLibrary {
    @PrimaryGeneratedColumn()
    noteLibraryId!: number;

    @Column()
    creatorId!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createTime!: Date;

    @Column()
    noteLibraryName!: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    lastUpdateTime!: Date;

    @Column()
    isDeleted!: boolean;
}
