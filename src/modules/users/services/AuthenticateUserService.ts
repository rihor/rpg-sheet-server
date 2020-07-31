import { injectable, inject } from "tsyringe"
import { sign } from "jsonwebtoken"

import authConfig from "@configs/auth"
import AppError from "@shared/errors/AppError"
import UsersRepositoryInterface from "@modules/users/repositories/UsersRepositoryInterface"
import User from "../infra/typeorm/entities/User"
import HashProviderInterface from "../providers/HashProvider/HashProviderInterface"

interface Request {
  email: string
  password: string
}

interface Response {
  user: User
  token: string
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepositoryInterface,

    @inject("HashProvider")
    private hashProvider: HashProviderInterface
  ) {}

  public async execute({ email, password }: Request): Promise<Response> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new AppError("Wrong email/password combination.", 401)
    }

    const doesPasswordMatch = await this.hashProvider.compareHash(
      password,
      user.password
    )

    if (!doesPasswordMatch) {
      throw new AppError("Wrong email/password combination.", 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({}, secret, {
      expiresIn,
      subject: user.id,
    })

    return {
      user,
      token,
    }
  }
}

export default AuthenticateUserService
