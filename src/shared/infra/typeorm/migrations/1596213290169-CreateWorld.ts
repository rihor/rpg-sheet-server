import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateWorld1596213290169 implements MigrationInterface {
  name = "CreateWorld1596213290169"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "worlds",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "description",
            type: "varchar",
            isNullable: true,
          },
          {
            name: "users_id",
            type: "uuid",
            isNullable: true,
          },
          {
            name: "rules_id",
            type: "uuid",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
        foreignKeys: [
          {
            name: "WorldOwner",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["users_id"],
            onDelete: "SET NULL",
            onUpdate: "CASCADE",
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("worlds")
  }
}
