import { container } from "tsyringe"

import "@modules/users/providers"

import CharactersRepository from "@modules/characters/infra/typeorm/repositories/CharactersRepository"
import CharactersRepositoryInterface from "@modules/characters/repositories/CharactersRepositoryInterface"
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository"
import UsersRepositoryInterface from "@modules/users/repositories/UsersRepositoryInterface"
import WorldsRepository from "@modules/worlds/infra/typeorm/repositories/WorldsRepository"
import WorldsRepositoryInterface from "@modules/worlds/repositories/WorldsRepositoryInterface"

container.registerSingleton<UsersRepositoryInterface>(
  "UsersRepository",
  UsersRepository
)

container.registerSingleton<WorldsRepositoryInterface>(
  "WorldsRepository",
  WorldsRepository
)

container.registerSingleton<CharactersRepositoryInterface>(
  "CharactersRepository",
  CharactersRepository
)
