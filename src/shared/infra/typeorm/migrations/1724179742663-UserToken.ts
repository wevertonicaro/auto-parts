import { MigrationInterface, QueryRunner, Table } from "typeorm";

const tableName = 'user_tokens'

export class UserToken1724179742663 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const tableExist = await queryRunner.hasTable(tableName)
        if (!tableExist) {
          await queryRunner.createTable(
            new Table({
              name: tableName,
              columns: [
                {
                  name: 'id',
                  type: 'int',
                  isPrimary: true,
                  isGenerated: true,
                  generationStrategy: 'increment',
                },
                {
                  name: "token",
                  type: "varchar(1000)",
                },
                {
                  name: "user_id",
                  type: "integer",
                  isUnique: true
                },
                {
                  name: "expires_date",
                  type: "varchar",
                },
                {
                  name: 'createdAt',
                  type: 'timestamp',
                  default: 'now()',
                },
                {
                  name: 'updatedAt',
                  type: 'timestamp',
                  default: 'now()',
                  onUpdate: 'now()'
                }
              ],
              foreignKeys: [
                {
                  name: 'FK_ResetPasswordTokens_User',
                  columnNames: ['user_id'],
                  referencedTableName: 'users',
                  referencedColumnNames: ['id'],
                  onDelete: 'CASCADE',
                  onUpdate: 'CASCADE'
                },
              ],
            })
          )
        }
      }
    
      public async down(queryRunner: QueryRunner): Promise<void> {
        const tableExists = await queryRunner.hasTable(tableName);
    
        if (tableExists) {
          await queryRunner.dropTable(tableName);
        }
      }

}
