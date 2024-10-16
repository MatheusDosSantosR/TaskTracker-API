import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1729043825057 implements MigrationInterface {
    name = 'CreateUserTable1729043825057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`comment\` (\`id\` int NOT NULL AUTO_INCREMENT, \`comment\` text NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`todoId\` int NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`subtask\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`is_completed\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`todoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`todo\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` text NULL, \`is_completed\` tinyint NOT NULL DEFAULT 0, \`priority\` enum ('low', 'medium', 'high') NOT NULL DEFAULT 'medium', \`due_date\` date NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`todo_categories_category\` (\`todoId\` int NOT NULL, \`categoryId\` int NOT NULL, INDEX \`IDX_4347fec6e6cc3be4ce39d9d9f3\` (\`todoId\`), INDEX \`IDX_80456ff2d7fd676c1ac2d107f3\` (\`categoryId\`), PRIMARY KEY (\`todoId\`, \`categoryId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_f28138baab6c22e4b27f489d8be\` FOREIGN KEY (\`todoId\`) REFERENCES \`todo\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`comment\` ADD CONSTRAINT \`FK_c0354a9a009d3bb45a08655ce3b\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`subtask\` ADD CONSTRAINT \`FK_c18d34a989b753de67e6edbb855\` FOREIGN KEY (\`todoId\`) REFERENCES \`todo\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`todo\` ADD CONSTRAINT \`FK_1e982e43f63a98ad9918a86035c\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`todo_categories_category\` ADD CONSTRAINT \`FK_4347fec6e6cc3be4ce39d9d9f36\` FOREIGN KEY (\`todoId\`) REFERENCES \`todo\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`todo_categories_category\` ADD CONSTRAINT \`FK_80456ff2d7fd676c1ac2d107f31\` FOREIGN KEY (\`categoryId\`) REFERENCES \`category\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`todo_categories_category\` DROP FOREIGN KEY \`FK_80456ff2d7fd676c1ac2d107f31\``);
        await queryRunner.query(`ALTER TABLE \`todo_categories_category\` DROP FOREIGN KEY \`FK_4347fec6e6cc3be4ce39d9d9f36\``);
        await queryRunner.query(`ALTER TABLE \`todo\` DROP FOREIGN KEY \`FK_1e982e43f63a98ad9918a86035c\``);
        await queryRunner.query(`ALTER TABLE \`subtask\` DROP FOREIGN KEY \`FK_c18d34a989b753de67e6edbb855\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_c0354a9a009d3bb45a08655ce3b\``);
        await queryRunner.query(`ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_f28138baab6c22e4b27f489d8be\``);
        await queryRunner.query(`DROP INDEX \`IDX_80456ff2d7fd676c1ac2d107f3\` ON \`todo_categories_category\``);
        await queryRunner.query(`DROP INDEX \`IDX_4347fec6e6cc3be4ce39d9d9f3\` ON \`todo_categories_category\``);
        await queryRunner.query(`DROP TABLE \`todo_categories_category\``);
        await queryRunner.query(`DROP TABLE \`todo\``);
        await queryRunner.query(`DROP TABLE \`subtask\``);
        await queryRunner.query(`DROP TABLE \`category\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`comment\``);
    }

}
