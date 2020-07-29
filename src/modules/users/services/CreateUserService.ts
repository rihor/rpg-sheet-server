import { inject, injectable } from "tsyringe"

import AppError from "@shared/errors/AppError"
import User from "../infra/typeorm/entities/User"
import UsersRepositoryInterface from "../repositories/UsersRepositoryInterface"
import HashProviderInterface from "../providers/HashProvider/models/HashProviderInterface"

interface IRequest {
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

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email)

    if (checkUserExists) {
      throw new AppError("Email address already used.")
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
