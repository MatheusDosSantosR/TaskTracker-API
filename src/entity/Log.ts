import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class Log {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' }) // Definindo o tipo explicitamente
    message: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    level: string; // Exemplo: "info", "error", etc.

    @Column({ type: 'text', nullable: true })
    context: string; // Informações adicionais sobre o contexto

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;
}
