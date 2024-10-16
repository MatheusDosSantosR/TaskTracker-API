import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../entity/User.js';
import { Category } from '../entity/Category.js';
import { Subtask } from '../entity/Subtask.js';
import { Comment } from '../entity/Comment.js';

@Entity()
export class Todo {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 255 })
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ type: "boolean", default: false })
    isCompleted: boolean;

    @Column({ type: 'enum', enum: ['low', 'medium', 'high'], default: 'medium' }) // Prioridade
    priority: 'low' | 'medium' | 'high';

    @Column({ type: 'date', nullable: true }) // Data de vencimento
    dueDate: Date;

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];

    @ManyToOne(() => User, (user) => user.todos, { onDelete: 'CASCADE' })
    user: User;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date | null;

/*     // Relação com subtarefas
    @ManyToOne(() => Subtask, (subtask) => subtask.todo, { cascade: true })
    subtasks: Subtask[];

    // Relação com comentários
    @ManyToOne(() => Comment, (comment) => comment.todo, { cascade: true })
    comments: Comment[]; */
}
