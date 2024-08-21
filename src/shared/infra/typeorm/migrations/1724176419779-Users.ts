import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = 'users'

export class Users1724176419779 implements MigrationInterface {

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
                  name: 'username',
                  type: 'varchar',
                },
                {
                  name: 'email',
                  type: 'varchar',
                  isUnique: true,
                },
                {
                  name: 'password',
                  type: 'varchar',
                },
                {
                  name: 'active',
                  type: 'tinyint',
                  default: true,
                },
                {
                  name: 'phone',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                    name: 'group_user_id',
                    type: 'integer'
                },
                {
                  name: 'createdAt',
                  type: 'timestamp',
                  default: 'now()',
                },
                {
                  name: 'updatedAt',
                  type: 'timestamp',
                  onUpdate: 'now()'
                }
              ],
              foreignKeys: [
                {
                    name: 'FK_users_group_users',
                    columnNames: ['group_user_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'group_users',
                    onDelete: 'NULL',
                    onUpdate: 'CASCADE',
                },
              ],
            })
          )
        }
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        const tableExist = await queryRunner.hasTable(tableName)
        if (tableExist) {
          await queryRunner.dropTable(tableName)
        }
      }

}
