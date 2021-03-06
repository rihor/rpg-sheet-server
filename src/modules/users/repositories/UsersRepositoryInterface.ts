import ICreateUserDTO from "../dtos/CreateUserDTO"
import User from "../infra/typeorm/entities/User"

export default interface UsersRepositoryInterface {
  findById(id: string): Promise<User | undefined>
  findByEmail(email: string): Promise<User | undefined>
  create(data: ICreateUserDTO): Promise<User>
  save(user: User): Promise<User>
}
