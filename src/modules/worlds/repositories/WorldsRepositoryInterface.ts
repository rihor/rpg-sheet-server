import CreateWorldDTO from "../dtos/CreateWorldDTO"
import World from "../infra/typeorm/entities/World"

export default interface WorldsRepositoryInterface {
  create(data: CreateWorldDTO): Promise<World>
  save(world: World): Promise<World>
  findById(id: string): Promise<World | undefined>
  findByTitle(title: string): Promise<[World[], number]>
}
