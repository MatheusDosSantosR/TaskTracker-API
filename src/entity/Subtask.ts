// src/entity/Subtask.ts

import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn
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

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;

    @DeleteDateColumn({ name: 'deleted_at' })
    deletedAt: Date | null;
}
