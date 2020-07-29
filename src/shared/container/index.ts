import { container } from "tsyringe"

import "@modules/users/providers"

import UsersRepositoryInterface from "@modules/users/repositories/UsersRepositoryInterface"
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository"

container.registerSingleton<UsersRepositoryInterface>(
  "UsersRepository",
  UsersRepository
)
