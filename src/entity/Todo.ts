// src/entity/Todo.ts

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    ManyToMany,
    JoinTable,
    OneToMany,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
} from 'typeorm';
import { User } from './User.js';
import { Category } from './Category.js';
import { Subtask } from './Subtask.js';
import { Comment } from './Comment.js';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ name: 'is_completed', type: 'boolean', default: false })
    isCompleted: boolean;

    @Column({
        type: 'enum',
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    })
    priority: 'low' | 'medium' | 'high';

    @Column({ name: 'due_date', type: 'date', nullable: true })
    dueDate: Date | null;

    @ManyToOne(() => User, (user) => user.todos, { onDelete: 'CASCADE' })
    user: User;

    @ManyToMany(() => Category, { cascade: true })
    @JoinTable()
    categories: Category[];

    @OneToMany(() => Subtask, (subtask) => subtask.todo)
    subtasks: Subtask[];

    @OneToMany(() => Comment, (comment) => comment.todo)
    comments: Comment[];

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date | null;
}
