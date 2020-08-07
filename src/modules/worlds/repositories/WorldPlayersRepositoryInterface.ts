import AddPlayerToWorldDTO from "../dtos/AddPlayerToWorldDTO"
import WorldPlayer from "../infra/typeorm/entities/WorldPlayer"

export default interface WorldPlayersRepositoryInterface {
  create(data: AddPlayerToWorldDTO): Promise<WorldPlayer>
  find(playerId: string, worldId: string): Promise<WorldPlayer | undefined>
}
