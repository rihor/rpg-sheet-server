import FakeHashProvider from "@shared/container/providers/HashProvider/FakeHashProvider"
import AppError from "@shared/errors/AppError"

import FakeUsersRepository from "../repositories/FakeUsersRepository"
import CreateUserService from "./CreateUserService"

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let createUser: CreateUserService

describe("CreateUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider)
  })

  it("should be able to create a new user", async () => {
    const user = await createUser.execute({
      name: "Fulano",
      email: "fulano@gmail.com",
      password: "123456",
    })

    expect(user).toHaveProperty("id")
  })

  it("should not be able to create a new user with same email from another", async () => {
    const userEmail = "fulano@gmail.com"

    await createUser.execute({
      name: "Fulano",
      email: userEmail,
      password: "123456",
    })

    await expect(
      createUser.execute({
        name: "Fulano",
        email: userEmail,
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
