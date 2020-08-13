import { container } from "tsyringe"

import "./providers"

import CharacterSheetsRepository from "@modules/characters/infra/typeorm/repositories/CharacterSheetsRepository"
import CharactersRepository from "@modules/characters/infra/typeorm/repositories/CharactersRepository"
import CharacterSheetsRepositoryInterface from "@modules/characters/repositories/CharacterSheetsRepositoryInterface"
import CharactersRepositoryInterface from "@modules/characters/repositories/CharactersRepositoryInterface"
import SystemBaseRepository from "@modules/system/infra/typeorm/repositories/SystemBaseRepository"
import SystemBaseRepositoryInterface from "@modules/system/repositories/SystemBaseRepositoryInterface"
import UsersRepository from "@modules/users/infra/typeorm/repositories/UsersRepository"
import UsersRepositoryInterface from "@modules/users/repositories/UsersRepositoryInterface"
import WorldPlayersRepository from "@modules/worlds/infra/typeorm/repositories/WorldPlayersRepository"
import WorldsRepository from "@modules/worlds/infra/typeorm/repositories/WorldsRepository"
import WorldPlayersRepositoryInterface from "@modules/worlds/repositories/WorldPlayersRepositoryInterface"
import WorldsRepositoryInterface from "@modules/worlds/repositories/WorldsRepositoryInterface"

container.registerSingleton<UsersRepositoryInterface>(
  "UsersRepository",
  UsersRepository
)

container.registerSingleton<WorldsRepositoryInterface>(
  "WorldsRepository",
  WorldsRepository
)

container.registerSingleton<WorldPlayersRepositoryInterface>(
  "WorldPlayersRepository",
  WorldPlayersRepository
)

container.registerSingleton<CharactersRepositoryInterface>(
  "CharactersRepository",
  CharactersRepository
)

container.registerSingleton<SystemBaseRepositoryInterface>(
  "SystemBasesRepository",
  SystemBaseRepository
)

container.registerSingleton<CharacterSheetsRepositoryInterface>(
  "CharacterSheetsRepository",
  CharacterSheetsRepository
)
