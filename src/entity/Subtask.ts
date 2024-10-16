// src/entity/Subtask.ts

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Todo } from './Todo.js';

@Entity()
export class Subtask {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255 })
    title: string;

    @Column({ name: 'is_completed', type: 'boolean', default: false })
    isCompleted: boolean;

    @ManyToOne(() => Todo, (todo) => todo.subtasks, { onDelete: 'CASCADE', cascade: true })
    todo: any;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
