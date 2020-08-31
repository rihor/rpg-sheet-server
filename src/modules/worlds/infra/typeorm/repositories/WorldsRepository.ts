import { getRepository, Repository, Like } from "typeorm"

import CreateWorldDTO from "@modules/worlds/dtos/CreateWorldDTO"
import FindAllByTitleDTO from "@modules/worlds/dtos/FindAllByTitleDTO"
import WorldsRepositoryInterface, {
  findAllByTitleResponse,
} from "@modules/worlds/repositories/WorldsRepositoryInterface"

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

    return world
  }

  public async findAllByTitle({
    title,
    page,
    perPage,
  }: FindAllByTitleDTO): Promise<findAllByTitleResponse> {
    const worldsWithCount = await this.ormRepository.findAndCount({
      where: {
        title: Like(`%${title}%`),
      },
      take: perPage,
      skip: perPage * (page - 1),
      relations: ["owner"],
    })

    return { worlds: worldsWithCount[0], count: worldsWithCount[1], page }
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
