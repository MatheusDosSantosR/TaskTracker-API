import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    DeleteDateColumn
} from 'typeorm';
import { Todo } from './Todo.js';
import { User } from './User.js';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    comment: string;

    @ManyToOne(() => Todo, (todo) => todo.comments, { onDelete: 'CASCADE' })
    todo: any;

    @ManyToOne(() => User, (user) => user.comments, { onDelete: 'CASCADE' })
    user: any;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date | null;
}
