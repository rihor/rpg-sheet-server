import { getRepository, Repository, Like } from "typeorm"

import CreateWorldDTO from "@modules/worlds/dtos/CreateWorldDTO"
import WorldsRepositoryInterface from "@modules/worlds/repositories/WorldsRepositoryInterface"

import World from "../entities/World"

class WorldsRepository implements WorldsRepositoryInterface {
  private ormRepository: Repository<World>

  constructor() {
    this.ormRepository = getRepository(World)
  }

  public async findById(id: string): Promise<World | undefined> {
    const world = await this.ormRepository.findOne(id, {
      relations: ["owner", "players", "characters"],
    })

    console.info(world)

    return world
  }

  public async findByTitle(title: string): Promise<[World[], number]> {
    const worldsWithCount = await this.ormRepository.findAndCount({
      where: {
        title: Like(`%${title}%`),
      },
      relations: ["owner"],
    })

    return worldsWithCount
  }

  public async create(worldData: CreateWorldDTO): Promise<World> {
    const world = this.ormRepository.create(worldData)

    await this.ormRepository.save(world)

    return world
  }

  public async save(world: World): Promise<World> {
    return this.ormRepository.save(world)
  }
}

export default WorldsRepository
