import {Entity, PrimaryGeneratedColumn, Column, ObjectLiteral} from 'typeorm';

@Entity()
export class NoteEntity implements ObjectLiteral {
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
