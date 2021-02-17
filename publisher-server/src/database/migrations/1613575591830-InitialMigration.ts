import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1613575591830 implements MigrationInterface {
    name = 'InitialMigration1613575591830'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "topic" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, CONSTRAINT "UQ_15f634a2dbf62a79bb726fc6158" UNIQUE ("name"), CONSTRAINT "PK_33aa4ecb4e4f20aa0157ea7ef61" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subscription" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "url" text NOT NULL, "topic" uuid NOT NULL, CONSTRAINT "PK_8c3e00ebd02103caa1174cd5d9d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_d727d3cea7380baf009c50469c" ON "subscription" ("url", "topic") `);
        await queryRunner.query(`ALTER TABLE "subscription" ADD CONSTRAINT "FK_0cfc83592dbf7a0e4fcd12128b5" FOREIGN KEY ("topic") REFERENCES "topic"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "subscription" DROP CONSTRAINT "FK_0cfc83592dbf7a0e4fcd12128b5"`);
        await queryRunner.query(`DROP INDEX "IDX_d727d3cea7380baf009c50469c"`);
        await queryRunner.query(`DROP TABLE "subscription"`);
        await queryRunner.query(`DROP TABLE "topic"`);
    }

}
