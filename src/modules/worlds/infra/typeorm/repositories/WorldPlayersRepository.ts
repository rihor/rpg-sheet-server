import { getRepository, Repository } from "typeorm"

import AddPlayerToWorldDTO from "@modules/worlds/dtos/AddPlayerToWorldDTO"
import WorldPlayersRepositoryInterface from "@modules/worlds/repositories/WorldPlayersRepositoryInterface"

import WorldPlayer from "../entities/WorldPlayer"

class WorldPlayersRepository implements WorldPlayersRepositoryInterface {
  private ormRepository: Repository<WorldPlayer>

  constructor() {
    this.ormRepository = getRepository(WorldPlayer)
  }

  async create(data: AddPlayerToWorldDTO): Promise<WorldPlayer> {
    const worldPlayer = this.ormRepository.create(data)

    await this.ormRepository.save(worldPlayer)

    return worldPlayer
  }

  async find(
    playerId: string,
    worldId: string
  ): Promise<WorldPlayer | undefined> {
    const worldPlayer = await this.ormRepository.findOne({
      where: {
        player_id: playerId,
        world_id: worldId,
      },
    })

    return worldPlayer
  }
}

export default WorldPlayersRepository
