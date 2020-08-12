import FakeUsersRepository from "@modules/users/repositories/FakeUsersRepository"
import FakeHashProvider from "@shared/container/providers/HashProvider/FakeHashProvider"
import AppError from "@shared/errors/AppError"

import FakeWorldsRepository from "../repositories/FakeWorldsRepository"
import CreateWorldService from "./CreateWorldService"

let fakeWorldsRepository: FakeWorldsRepository
let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let createWorld: CreateWorldService

describe("CreateWorld", () => {
  beforeEach(() => {
    fakeWorldsRepository = new FakeWorldsRepository()
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    createWorld = new CreateWorldService(
      fakeWorldsRepository,
      fakeUsersRepository,
      fakeHashProvider
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
      systemBaseId: "b6026c91-345b-4fb1-b529-7566bbc0579d",
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
        systemBaseId: "b6026c91-345b-4fb1-b529-7566bbc0579d",
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
