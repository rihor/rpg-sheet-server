import AppError from "@shared/errors/AppError"

import FakeHashProvider from "../providers/HashProvider/FakeHashProvider"
import FakeUsersRepository from "../repositories/FakeUsersRepository"
import AuthenticateUserService from "./AuthenticateUserService"

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let authenticateUser: AuthenticateUserService

describe("AuthenticateUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider
    )
  })

  it("should be able to authenticate a user", async () => {
    const user = await fakeUsersRepository.create({
      email: "fulano@gmail.com",
      name: "fulano",
      password: "123456",
    })

    const response = await authenticateUser.execute({
      email: "fulano@gmail.com",
      password: "123456",
    })

    expect(response.user).toEqual(user)
    expect(response).toHaveProperty("token")
  })

  it("should not be able to authenticate a user with non-existing user", async () => {
    await expect(
      authenticateUser.execute({
        email: "fulano@gmail.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to authenticate with wrong password", async () => {
    await fakeUsersRepository.create({
      email: "fulano@gmail.com",
      name: "fulano",
      password: "123456",
    })

    await expect(
      authenticateUser.execute({
        email: "fulano@gmail.com",
        password: "wrong_password",
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
