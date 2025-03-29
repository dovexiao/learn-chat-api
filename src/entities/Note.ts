import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    noteId!: number;

    @Column()
    noteLibraryId!: number;

    @Column()
    creatorId!: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createTime!: Date;

    @Column()
    isDeleted!: boolean;
}
