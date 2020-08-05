import { inject, injectable } from "tsyringe"

import AppError from "@shared/errors/AppError"

import User from "../infra/typeorm/entities/User"
import HashProviderInterface from "../providers/HashProvider/HashProviderInterface"
import UsersRepositoryInterface from "../repositories/UsersRepositoryInterface"

interface Request {
  user_id: string
  name?: string
  email?: string
  old_password?: string
  password?: string
}

@injectable()
class ShowProfileService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepositoryInterface,

    @inject("HashProvider")
    private hashProvider: HashProviderInterface
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: Request): Promise<User> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new AppError("User not found.", 404)
    }

    if (email) {
      const userAlreadyUsingEmail = await this.usersRepository.findByEmail(
        email
      )

      if (userAlreadyUsingEmail && userAlreadyUsingEmail.id !== user_id) {
        throw new AppError("Email is already being used.", 409)
      }

      user.email = email
    }

    if (password && !old_password) {
      throw new AppError("You must insert the current password to change it.")
    }

    if (password && old_password) {
      const doesPasswordMatch = await this.hashProvider.compareHash(
        old_password,
        user.password
      )

      if (!doesPasswordMatch) {
        throw new AppError("The old password doesn't match.")
      }

      user.password = await this.hashProvider.generateHash(password)
    }

    user.name = name || user.name

    return this.usersRepository.save(user)
  }
}

export default ShowProfileService
