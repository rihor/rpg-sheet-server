import { v4 as uuid } from "uuid"

import FakeUsersRepository from "@modules/users/repositories/FakeUsersRepository"
import FakeWorldsRepository from "@modules/worlds/repositories/FakeWorldsRepository"
import AppError from "@shared/errors/AppError"

import FakeCharactersRepository from "../repositories/FakeCharactersRepository"
import CreateCharacterService from "./CreateCharacterService"

let fakeCharactersRepository: FakeCharactersRepository
let fakeUsersRepository: FakeUsersRepository
let fakeWorldsRepository: FakeWorldsRepository
let createCharacter: CreateCharacterService

describe("CreateUser", () => {
  beforeEach(() => {
    fakeCharactersRepository = new FakeCharactersRepository()
    fakeUsersRepository = new FakeUsersRepository()
    fakeWorldsRepository = new FakeWorldsRepository()

    createCharacter = new CreateCharacterService(
      fakeCharactersRepository,
      fakeUsersRepository,
      fakeWorldsRepository
    )
  })

  it("should be able to create a new character", async () => {
    const user = await fakeUsersRepository.create({
      name: "username",
      email: "user@email.com",
      password: "123456",
    })

    const world = await fakeWorldsRepository.create({
      password: "world_pass",
      title: "World",
      rule_id: uuid(),
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

    const world = await fakeWorldsRepository.create({
      password: "world_pass",
      title: "World",
      rule_id: uuid(),
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
