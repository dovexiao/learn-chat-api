import {Entity, Column, ObjectLiteral, PrimaryColumn} from 'typeorm';

@Entity()
export class UserNoteEntity implements ObjectLiteral {
    @PrimaryColumn()
    noteId!: number;

    @Column()
    userId!: number;

    @Column({ nullable: true })
    tags!: string;

    @Column({ nullable: true })
    remarks!: string;

    @Column()
    contentId!: number;

    @Column({
        type: 'enum',
        enum: {
            DRAFT: 'draft',
            UPDATE_EVENT: 'update_event'
        }
    })
    contentSource!: 'draft' | 'update_event';
}
