import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = 'models'

export class Modelos1731015362796 implements MigrationInterface {

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
                            name: 'car_id',
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
                            name: 'FK_model_car_id',
                            columnNames: ['car_id'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'cars',
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
