import { v4 as uuid } from "uuid"

import CreateWorldDTO from "@modules/worlds/dtos/CreateWorldDTO"
import FindAllByTitleDTO from "@modules/worlds/dtos/FindAllByTitleDTO"
import WorldsRepositoryInterface, {
  findAllByTitleResponse,
} from "@modules/worlds/repositories/WorldsRepositoryInterface"

import World from "../infra/typeorm/entities/World"

class FakeWorldsRepository implements WorldsRepositoryInterface {
  private worlds: World[] = []

  public async findById(id: string): Promise<World | undefined> {
    const worldFound = this.worlds.find((world) => world.id === id)

    return worldFound
  }

  public async findAllByTitle({
    title,
    page,
    perPage,
  }: FindAllByTitleDTO): Promise<findAllByTitleResponse> {
    let count = 0
    const listOfWorlds: World[] = []

    this.worlds.forEach((world) => {
      if (world.title.includes(title)) {
        ++count

        if (listOfWorlds.length < perPage) {
          listOfWorlds.push(world)
        }
      }
    })

    return { worlds: listOfWorlds, count, page }
  }

  public async create(worldData: CreateWorldDTO): Promise<World> {
    const world = new World()

    Object.assign(
      world,
      { id: uuid(), players: [], owner: { id: worldData.user_id } },
      worldData
    )

    this.worlds.push(world)

    return world
  }

  public async save(world: World): Promise<World> {
    const findIndex = this.worlds.findIndex((w) => w.id === world.id)

    this.worlds[findIndex] = world

    return world
  }
}

export default FakeWorldsRepository
