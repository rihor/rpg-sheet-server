import FakeSystemBasesRepository from "@modules/system/repositories/FakeSystemBaseRepository"
import FakeUsersRepository from "@modules/users/repositories/FakeUsersRepository"
import FakeWorldsRepository from "@modules/worlds/repositories/FakeWorldsRepository"
import AppError from "@shared/errors/AppError"

import FakeCharacterSheetsRepository from "../repositories/FakeCharacterSheetsRepository"
import FakeCharactersRepository from "../repositories/FakeCharactersRepository"
import CreateCharacterService from "./CreateCharacterService"

let fakeCharactersRepository: FakeCharactersRepository
let fakeUsersRepository: FakeUsersRepository
let fakeWorldsRepository: FakeWorldsRepository
let fakeSystemBasesRepository: FakeSystemBasesRepository
let fakeCharacterSheetsRepository: FakeCharacterSheetsRepository
let createCharacter: CreateCharacterService

const formBase = {
  currencies: ["gold", "silver"],
  stats: ["strength", "dexterity"],
  hasAllignment: false,
  hasArmor: false,
  hasBackground: false,
  hasClass: false,
  hasExp: false,
  hasInitiative: false,
  hasLevel: false,
  hasMana: false,
  hasMultipleLanguages: false,
  hasPerception: false,
  hasRace: false,
  hasSavingThrows: false,
  hasSpeed: false,
}

describe("CreateCharacter", () => {
  beforeEach(() => {
    fakeCharactersRepository = new FakeCharactersRepository()
    fakeUsersRepository = new FakeUsersRepository()
    fakeWorldsRepository = new FakeWorldsRepository()
    fakeSystemBasesRepository = new FakeSystemBasesRepository()
    fakeCharacterSheetsRepository = new FakeCharacterSheetsRepository()

    createCharacter = new CreateCharacterService(
      fakeCharactersRepository,
      fakeUsersRepository,
      fakeWorldsRepository,
      fakeSystemBasesRepository,
      fakeCharacterSheetsRepository
    )
  })

  it("should be able to create a new character", async () => {
    const user = await fakeUsersRepository.create({
      name: "username",
      email: "user@email.com",
      password: "123456",
    })

    const systemBase = await fakeSystemBasesRepository.create({
      title: "System Base",
      description: "description",
      formBase,
    })

    const world = await fakeWorldsRepository.create({
      password: "world_pass",
      title: "World",
      system_base_id: systemBase.id,
      user_id: user.id,
    })

    const character = await createCharacter.execute({
      name: "NPC",
      ownerId: user.id,
      worldId: world.id,
    })

    expect(character).toHaveProperty("id")
  })

  it("should not be able to create a new character with a non-existing user", async () => {
    const worldOwner = await fakeUsersRepository.create({
      name: "username",
      email: "user@email.com",
      password: "123456",
    })

    const systemBase = await fakeSystemBasesRepository.create({
      title: "FAKE SYSTEM BASE",
      description: "description",
      formBase,
    })

    const world = await fakeWorldsRepository.create({
      password: "world_pass",
      title: "World",
      system_base_id: systemBase.id,
      user_id: worldOwner.id,
    })

    await expect(
      createCharacter.execute({
        name: "Fake character",
        worldId: world.id,
        ownerId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to create a new character with a non-existing world", async () => {
    const user = await fakeUsersRepository.create({
      name: "username",
      email: "user@email.com",
      password: "123456",
    })

    await expect(
      createCharacter.execute({
        name: "Fake character",
        worldId: "non-existing-id",
        ownerId: user.id,
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
