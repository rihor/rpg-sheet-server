import CreateWorldDTO from "../dtos/CreateWorldDTO"
import FindAllByTitleDTO from "../dtos/FindAllByTitleDTO"
import World from "../infra/typeorm/entities/World"

export type findAllByTitleResponse = {
  worlds: World[]
  count: number
  page: number
}

export default interface WorldsRepositoryInterface {
  create(data: CreateWorldDTO): Promise<World>
  save(world: World): Promise<World>
  findById(id: string): Promise<World | undefined>
  findAllByTitle(data: FindAllByTitleDTO): Promise<findAllByTitleResponse>
}
