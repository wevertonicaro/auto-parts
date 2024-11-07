import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = 'automakers'

export class Marcas1731015122301 implements MigrationInterface {

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
                            name: 'description',
                            type: 'varchar',
                        },
                        {
                            name: 'created_at',
                            type: 'timestamp',
                            default: 'CURRENT_TIMESTAMP',
                        },
                        {
                            name: 'updated_at',
                            type: 'timestamp',
                            isNullable: true,  
                            default: null, 
                            onUpdate: 'CURRENT_TIMESTAMP'
                        },
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
