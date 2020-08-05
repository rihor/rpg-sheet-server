import { inject, injectable } from "tsyringe"

import AppError from "@shared/errors/AppError"

import User from "../infra/typeorm/entities/User"
import UsersRepositoryInterface from "../repositories/UsersRepositoryInterface"

interface Request {
  user_id: string
}

@injectable()
class ShowProfileService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepositoryInterface
  ) {}

  public async execute({ user_id }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError("User not found.", 404)
    }

    return user
  }
}

export default ShowProfileService
