import { MigrationInterface, QueryRunner, Table } from 'typeorm'

const tableName = 'parts_models_relations'

export class PartsModelsRelations1741879527912 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExist = await queryRunner.hasTable(tableName)
        if (!tableExist) {
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
                            name: 'car_model_id',
                            type: 'integer',
                        },
                        {
                            name: 'part_id',
                            type: 'integer',
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
                            onUpdate: 'CURRENT_TIMESTAMP',
                        },
                    ],
                    foreignKeys: [
                        {
                            name: 'FK_car_model_id',
                            columnNames: ['car_model_id'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'models',
                            onUpdate: 'CASCADE',
                            onDelete: 'CASCADE',
                        },
                        {
                            name: 'FK_part_id',
                            columnNames: ['part_id'],
                            referencedColumnNames: ['id'],
                            referencedTableName: 'parts',
                            onUpdate: 'CASCADE',
                            onDelete: 'CASCADE',
                        },
                    ],
                })
            )
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const tableExist = await queryRunner.hasTable(tableName)
        if (!tableExist) {
            await queryRunner.dropTable(tableName)
        }
    }
}
