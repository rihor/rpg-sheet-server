import FakeUsersRepository from "@modules/users/repositories/FakeUsersRepository"
import AppError from "@shared/errors/AppError"

import FakeWorldsRepository from "../repositories/FakeWorldsRepository"
import CreateWorldService from "./CreateWorldService"

let fakeWorldsRepository: FakeWorldsRepository
let fakeUsersRepository: FakeUsersRepository
let createWorld: CreateWorldService

describe("CreateWorld", () => {
  beforeEach(() => {
    fakeWorldsRepository = new FakeWorldsRepository()
    fakeUsersRepository = new FakeUsersRepository()

    createWorld = new CreateWorldService(
      fakeWorldsRepository,
      fakeUsersRepository
    )
  })

  it("should be able to create a new world", async () => {
    const user = await fakeUsersRepository.create({
      name: "user",
      email: "user@email.com",
      password: "123456",
    })

    const world = await createWorld.execute({
      title: "Amazing World",
      password: "password",
      description: "About the world",
      ownerId: user.id,
    })

    expect(world).toHaveProperty("id")
  })

  it("should not be able to create a new world with non-existing owner", async () => {
    expect(
      createWorld.execute({
        title: "Amazing World",
        password: "password",
        description: "About the world",
        ownerId: "non-existing_id",
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
