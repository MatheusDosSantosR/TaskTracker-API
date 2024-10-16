import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    message: string;

    @Column({ nullable: true })
    level: string; // Exemplo: "info", "error", etc.

    @Column({ nullable: true })
    context: string; // Informações adicionais sobre o contexto

    @CreateDateColumn({ type: 'timestamp' }) // Cria automaticamente a data de criação
    createdAt: Date;
}
