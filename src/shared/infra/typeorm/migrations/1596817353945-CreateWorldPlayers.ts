import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateWorldPlayers1596817353945 implements MigrationInterface {
  name = "CreateWorldPlayers1596817353945"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "world_players",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "player_id",
            type: "uuid",
          },
          {
            name: "world_id",
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
            columnNames: ["world_id"],
            onDelete: "CASCADE",
            onUpdate: "CASCADE",
          },
        ],
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("world_players")
  }
}
