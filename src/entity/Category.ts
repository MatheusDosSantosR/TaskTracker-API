// src/entity/Category.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Todo } from './Todo.js';

@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 100 })
    name: string;

    @ManyToMany(() => Todo, (todo) => todo.categories)
    todos: Todo[];    
}
