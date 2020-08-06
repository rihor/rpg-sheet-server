import CreateWorldDTO from "../dtos/CreateWorldDTO"
import World from "../infra/typeorm/entities/World"

export default interface UsersRepositoryInterface {
  create(data: CreateWorldDTO): Promise<World>
  save(user: World): Promise<World>
  findById(id: string): Promise<World | undefined>
  findByTitle(title: string): Promise<[World[], number]>
}
