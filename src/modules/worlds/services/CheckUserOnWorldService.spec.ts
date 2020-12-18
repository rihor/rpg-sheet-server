import { ObjectID } from "mongodb"

import FakeUsersRepository from "@modules/users/repositories/FakeUsersRepository"
import AppError from "@shared/errors/AppError"

import FakeWorldsRepository from "../repositories/FakeWorldsRepository"
import CheckUserOnWorldService from "./CheckUserOnWorldService"

let fakeWorldsRepository: FakeWorldsRepository
let fakeUsersRepository: FakeUsersRepository
let checkUserOnWorld: CheckUserOnWorldService

describe("CheckUserOnWorld", () => {
  beforeEach(() => {
    fakeWorldsRepository = new FakeWorldsRepository()
    fakeUsersRepository = new FakeUsersRepository()

    checkUserOnWorld = new CheckUserOnWorldService(fakeWorldsRepository)
  })

  it("should be able to find user on world", async () => {
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

    const userFound = await checkUserOnWorld.execute({
      worldId: world.id,
      playerId: user.id,
    })

    expect(userFound).toBeTruthy()
  })

  it("should not be able to find a non-existing user", async () => {
    const world = await fakeWorldsRepository.create({
      user_id: "fake-user-id",
      password: "world_password",
      system_base_id: new ObjectID(),
      title: "World Test",
    })

    const isUserOnWorld = await checkUserOnWorld.execute({
      worldId: world.id,
      playerId: "non-existing id",
    })

    expect(isUserOnWorld).toBeFalsy()
  })

  it("should not be able to find a non-existing world", async () => {
    const user = await fakeUsersRepository.create({
      email: "fake@email.com",
      name: "fake user",
      password: "123456",
    })

    await expect(
      checkUserOnWorld.execute({
        worldId: "non-existing world",
        playerId: user.id,
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
