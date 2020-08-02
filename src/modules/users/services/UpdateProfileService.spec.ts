import AppError from "@shared/errors/AppError"
import FakeUsersRepository from "../repositories/FakeUsersRepository"
import FakeHashProvider from "../providers/HashProvider/FakeHashProvider"
import UpdateProfileService from "./UpdateProfileService"

let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let updateProfile: UpdateProfileService

describe("UpdateProfile", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider
    )
  })

  it("should be able to update the user profile", async () => {
    const user = await fakeUsersRepository.create({
      name: "user",
      email: "email@email.com",
      password: "old_pass",
    })

    const response = await updateProfile.execute({
      user_id: user.id,
      name: "new_name",
      email: "new@email.com",
      password: "new_pass",
      old_password: "old_pass",
    })

    expect(response.name).toEqual("new_name")
    expect(response.email).toEqual("new@email.com")
    expect(response.password).toEqual("new_pass")
  })

  it("should not be able to update a non-existing user profile", async () => {
    await expect(
      updateProfile.execute({
        user_id: "non-existing_id",
        name: "new_name",
        email: "new@email.com",
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to update profile to an already used email", async () => {
    await fakeUsersRepository.create({
      name: "user",
      password: "password",
      email: "first@email.com",
    })

    const user = await fakeUsersRepository.create({
      name: "user",
      password: "password",
      email: "second@email.com",
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        email: "first@email.com",
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to update profile without inserting old password", async () => {
    const user = await fakeUsersRepository.create({
      name: "user",
      password: "password",
      email: "user@email.com",
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        password: "amazing_email",
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to update profile with wrong old password", async () => {
    const user = await fakeUsersRepository.create({
      name: "user",
      password: "old_pass",
      email: "user@email.com",
    })

    await expect(
      updateProfile.execute({
        user_id: user.id,
        password: "new_pass",
        old_password: "wrong_pass",
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it("should be able to update profile with empty request", async () => {
    const user = await fakeUsersRepository.create({
      name: "user",
      email: "email@email.com",
      password: "pass",
    })

    const response = await updateProfile.execute({
      user_id: user.id,
    })

    expect(response.id).toEqual(user.id)
  })
})
