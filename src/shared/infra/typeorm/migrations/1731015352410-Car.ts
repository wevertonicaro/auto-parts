import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = 'cars'

export class Veiculos1731015352410 implements MigrationInterface {

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
                            name: 'automaker_id',
                            type: 'integer'
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
                    ],
                    foreignKeys: [
                        {
                            name: 'FK_car_automaker_id',
                            columnNames: ['automaker_id'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'automakers',
                            onUpdate: 'CASCADE',
                            onDelete: 'CASCADE'
                        },
                    ],
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
