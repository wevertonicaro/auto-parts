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
                    name: 'FK_users_group_users',
                    columnNames: ['group_user_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'group_users',
                    onUpdate: 'CASCADE',
                },
              ],
              indices: [
                {
                    name: 'UQ_email',
                    columnNames: ['email'],
                    isUnique: true,
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
