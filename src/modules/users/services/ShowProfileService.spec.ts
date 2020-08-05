import AppError from "@shared/errors/AppError"

import FakeUsersRepository from "../repositories/FakeUsersRepository"
import ShowProfileService from "./ShowProfileService"

let fakeUsersRepository: FakeUsersRepository
let showProfile: ShowProfileService

describe("ShowProfile", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    showProfile = new ShowProfileService(fakeUsersRepository)
  })

  it("should be show user profile", async () => {
    const user = await fakeUsersRepository.create({
      name: "user",
      password: "password",
      email: "email@email.com",
    })

    const response = await showProfile.execute({
      user_id: user.id,
    })

    expect(response).toEqual(user)
  })

  it("should not be able to show a non-existing user profile", async () => {
    await expect(
      showProfile.execute({
        user_id: "non-existing_id",
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
