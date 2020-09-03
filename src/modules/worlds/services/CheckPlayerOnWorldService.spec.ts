import { ObjectID } from "mongodb"

import FakeUsersRepository from "@modules/users/repositories/FakeUsersRepository"
import AppError from "@shared/errors/AppError"

import FakeWorldsRepository from "../repositories/FakeWorldsRepository"
import CheckPlayerOnWorldService from "../services/CheckPlayerOnWorldService"

let fakeWorldsRepository: FakeWorldsRepository
let fakeUsersRepository: FakeUsersRepository
let checkPlayerOnWorld: CheckPlayerOnWorldService

describe("CheckPlayerOnWorld", () => {
  beforeEach(() => {
    fakeWorldsRepository = new FakeWorldsRepository()
    fakeUsersRepository = new FakeUsersRepository()

    checkPlayerOnWorld = new CheckPlayerOnWorldService(fakeWorldsRepository)
  })

  it("should be able to player on world", async () => {
    const world = await fakeWorldsRepository.create({
      user_id: "fake-user-id",
      password: "world_password",
      system_base_id: new ObjectID(),
      title: "World Test",
    })

    const user = await fakeUsersRepository.create({
      email: "fake@email.com",
      name: "fake user",
      password: "123456",
    })

    world.players.push(user)

    await fakeWorldsRepository.save(world)

    const playerFound = await checkPlayerOnWorld.execute({
      worldId: world.id,
      playerId: user.id,
    })

    expect(playerFound).toEqual(user)
  })

  it("should not be able to find a non-existing player", async () => {
    const world = await fakeWorldsRepository.create({
      user_id: "fake-user-id",
      password: "world_password",
      system_base_id: new ObjectID(),
      title: "World Test",
    })

    await expect(
      checkPlayerOnWorld.execute({
        worldId: world.id,
        playerId: "non-existing id",
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to find a non-existing world", async () => {
    const user = await fakeUsersRepository.create({
      email: "fake@email.com",
      name: "fake user",
      password: "123456",
    })

    await expect(
      checkPlayerOnWorld.execute({
        worldId: "non-existing world",
        playerId: user.id,
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
