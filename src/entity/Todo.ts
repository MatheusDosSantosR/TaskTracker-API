import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import {User} from './User'; // Usando o alias configurado no `tsconfig.json`

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ default: false })
    isCompleted: boolean;

    @ManyToOne(() => User, (user) => user.todos, { onDelete: 'CASCADE' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn() // Marca a data de exclusão
    deletedAt: Date | null;
}
