import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { Todo } from './Todo.js';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    comment: string;

/*     @ManyToOne(() => Todo, (todo) => todo.comments, { onDelete: 'CASCADE' })
    todo: Todo; */

    @CreateDateColumn()
    createdAt: Date;
}
