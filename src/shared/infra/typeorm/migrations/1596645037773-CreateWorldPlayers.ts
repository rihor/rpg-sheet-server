import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateWorldPlayers1596645037773 implements MigrationInterface {
  name = "CreateWorldPlayers1596645037773"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "worlds_players",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "worlds_id",
            type: "uuid",
          },
          {
            name: "player_id",
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
            name: "WorldPlayer",
            referencedTableName: "users",
            referencedColumnNames: ["id"],
            columnNames: ["player_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
          {
            name: "PlayerWorld",
            referencedTableName: "worlds",
            referencedColumnNames: ["id"],
            columnNames: ["worlds_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("worlds_players")
  }
}
