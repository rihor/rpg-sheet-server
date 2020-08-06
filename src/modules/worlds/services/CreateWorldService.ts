import { inject, injectable } from "tsyringe"

import UsersRepositoryInterface from "@modules/users/repositories/UsersRepositoryInterface"
import AppError from "@shared/errors/AppError"

import World from "../infra/typeorm/entities/World"
import WorldsRepositoryInterface from "../repositories/WorldsRepositoryInterface"

interface Request {
  title: string
  description?: string
  password: string
  ownerId: string
  ruleId: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject("WorldsRepository")
    private worldsRepository: WorldsRepositoryInterface,

    @inject("UsersRepository")
    private usersRepository: UsersRepositoryInterface
  ) {}

  public async execute({
    title,
    description,
    password,
    ownerId,
    ruleId,
  }: Request): Promise<World> {
    const user = await this.usersRepository.findById(ownerId)

    if (!user) {
      throw new AppError("User not found.", 404)
    }

    const world = await this.worldsRepository.create({
      title,
      password,
      description,
      users_id: user.id,
      rules_id: ruleId,
    })

    return world
  }
}

export default CreateUserService
