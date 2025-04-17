import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ImageEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'longtext', // MySQL的LONGTEXT类型，支持最大4GB数据
    })
    base64!: string;

    @Column()
    type!: string;

    @Column()
    width!: number;

    @Column()
    height!: number;

    @Column({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP',
    })
    createTime!: Date;

    @Column()
    isDelete!: boolean;
}
