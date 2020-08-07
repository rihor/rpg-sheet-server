import { uuid } from "uuidv4"

import AddPlayerToWorldDTO from "@modules/worlds/dtos/AddPlayerToWorldDTO"
import WorldPlayersRepositoryInterface from "@modules/worlds/repositories/WorldPlayersRepositoryInterface"

import WorldPlayer from "../infra/typeorm/entities/WorldPlayer"

class FakeWorldPlayersRepository implements WorldPlayersRepositoryInterface {
  private worldPlayers: WorldPlayer[] = []

  async create(data: AddPlayerToWorldDTO): Promise<WorldPlayer> {
    const worldPlayer = new WorldPlayer()

    Object.assign(worldPlayer, {
      id: uuid(),
      world_id: data.worldId,
      player_id: data.playerId,
    })

    this.worldPlayers.push(worldPlayer)

    return worldPlayer
  }

  async find(
    playerId: string,
    worldId: string
  ): Promise<WorldPlayer | undefined> {
    const worldPlayer = this.worldPlayers.find((wP) => {
      console.info(wP)
      return wP.player_id === playerId && wP.world_id === worldId
    })

    return worldPlayer
  }
}

export default FakeWorldPlayersRepository
