import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = 'group_users'

export class GroupUsers1724176411102 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExist = await queryRunner.hasTable(tableName)
        if(!tableExist) {
            await queryRunner.createTable(
                new Table({
                    name: tableName,
                    columns: [
                        {
                            name: 'id',
                            type: 'integer',
                            isPrimary: true,
                            isGenerated: true,
                            generationStrategy: 'increment',
                        },
                        {
                            name: 'name',
                            type: 'varchar',
                        },
                        {
                            name: 'createdAt',
                            type: 'timestamp',
                            default: 'now()',
                        },
                        {
                            name: 'updatedAt',
                            type: 'timestamp',
                            default: 'null',
                            onUpdate: 'now()'
                        }
                    ]
                })
            )
        }
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tableExist = await queryRunner.hasTable(tableName)
        if(!tableExist) {
            await queryRunner.dropTable(tableName)
        }
    }

}
