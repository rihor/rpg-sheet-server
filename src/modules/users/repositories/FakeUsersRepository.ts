import { uuid } from "uuidv4"

import CreateUserDTO from "@modules/users/dtos/CreateUserDTO"
import User from "@modules/users/infra/typeorm/entities/User"
import UsersRepositoryInterface from "@modules/users/repositories/UsersRepositoryInterface"

export default class FakeUsersRepository implements UsersRepositoryInterface {
  private users: User[] = []

  async create(data: CreateUserDTO): Promise<User> {
    const user = new User()

    Object.assign(user, { id: uuid() }, data)

    this.users.push(user)

    return user
  }

  async save(userToSave: User): Promise<User> {
    const findIndex = this.users.findIndex((user) => user.id === userToSave.id)

    this.users[findIndex] = userToSave

    return userToSave
  }

  async findById(id: string): Promise<User | undefined> {
    const userFound = this.users.find((user) => user.id === id)

    return userFound
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const userFound = this.users.find((user) => user.email === email)

    return userFound
  }
}
