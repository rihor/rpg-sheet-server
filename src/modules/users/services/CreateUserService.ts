import { inject, injectable } from "tsyringe"

import AppError from "@shared/errors/AppError"

import User from "../infra/typeorm/entities/User"
import HashProviderInterface from "../providers/HashProvider/HashProviderInterface"
import UsersRepositoryInterface from "../repositories/UsersRepositoryInterface"

interface Request {
  name: string
  email: string
  password: string
}

@injectable()
class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepositoryInterface,

    @inject("HashProvider")
    private hashProvider: HashProviderInterface
  ) {}

  public async execute({ name, email, password }: Request): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError("Email address already used.", 409)
    }

    const hashedPassword = await this.hashProvider.generateHash(password)

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    })

    return user
  }
}

export default CreateUserService
