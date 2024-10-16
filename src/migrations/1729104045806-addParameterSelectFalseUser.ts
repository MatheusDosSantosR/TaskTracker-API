import { MigrationInterface, QueryRunner } from "typeorm";

export class AddParameterSelectFalseUser1729104045806 implements MigrationInterface {
    name = 'AddParameterSelectFalseUser1729104045806'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_f28138baab6c22e4b27f489d8be\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c0354a9a009d3bb45a08655ce3b\``);
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`todoId\` \`todoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`subtask\` DROP FOREIGN KEY \`FK_c18d34a989b753de67e6edbb855\``);
        await queryRunner.query(`ALTER TABLE \`subtask\` CHANGE \`id\` \`id\` int NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`subtask\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`subtask\` CHANGE \`todoId\` \`todoId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`todo\` DROP FOREIGN KEY \`FK_1e982e43f63a98ad9918a86035c\``);
        await queryRunner.query(`ALTER TABLE \`todo\` CHANGE \`description\` \`description\` text NULL`);
        await queryRunner.query(`ALTER TABLE \`todo\` CHANGE \`due_date\` \`due_date\` date NULL`);
        await queryRunner.query(`ALTER TABLE \`todo\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`todo\` CHANGE \`userId\` \`userId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_f28138baab6c22e4b27f489d8be\` FOREIGN KEY (\`todoId\`) REFERENCES \`todo\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c0354a9a009d3bb45a08655ce3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`subtask\` ADD CONSTRAINT \`FK_c18d34a989b753de67e6edbb855\` FOREIGN KEY (\`todoId\`) REFERENCES \`todo\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD CONSTRAINT \`FK_1e982e43f63a98ad9918a86035c\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo\` DROP FOREIGN KEY \`FK_1e982e43f63a98ad9918a86035c\``);
        await queryRunner.query(`ALTER TABLE \`subtask\` DROP FOREIGN KEY \`FK_c18d34a989b753de67e6edbb855\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c0354a9a009d3bb45a08655ce3b\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_f28138baab6c22e4b27f489d8be\``);
        await queryRunner.query(`ALTER TABLE \`todo\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`todo\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`todo\` CHANGE \`due_date\` \`due_date\` date NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`todo\` CHANGE \`description\` \`description\` text NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD CONSTRAINT \`FK_1e982e43f63a98ad9918a86035c\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`subtask\` CHANGE \`todoId\` \`todoId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`subtask\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`subtask\` CHANGE \`id\` \`id\` int UNSIGNED NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`subtask\` ADD CONSTRAINT \`FK_c18d34a989b753de67e6edbb855\` FOREIGN KEY (\`todoId\`) REFERENCES \`todo\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`user\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`userId\` \`userId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`todoId\` \`todoId\` int NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`comment\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT 'NULL'`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c0354a9a009d3bb45a08655ce3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_f28138baab6c22e4b27f489d8be\` FOREIGN KEY (\`todoId\`) REFERENCES \`todo\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
