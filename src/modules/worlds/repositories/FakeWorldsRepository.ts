import { v4 as uuid } from "uuid"

import CreateWorldDTO from "@modules/worlds/dtos/CreateWorldDTO"
import WorldsRepositoryInterface from "@modules/worlds/repositories/WorldsRepositoryInterface"

import World from "../infra/typeorm/entities/World"

class FakeWorldsRepository implements WorldsRepositoryInterface {
  private worlds: World[] = []

  public async findById(id: string): Promise<World | undefined> {
    const worldFound = this.worlds.find((world) => world.id === id)

    return worldFound
  }

  public async findByTitle(title: string): Promise<[World[], number]> {
    let count = 0
    const listOfWorlds: World[] = []

    this.worlds.forEach((world) => {
      if (world.title.includes(title)) {
        ++count
        listOfWorlds.push(world)
      }
    })

    return [listOfWorlds, count]
  }

  public async create(worldData: CreateWorldDTO): Promise<World> {
    const world = new World()

    Object.assign(world, { id: uuid() }, worldData)

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
