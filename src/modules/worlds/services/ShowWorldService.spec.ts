import AppError from "@shared/errors/AppError"

import FakeWorldsRepository from "../repositories/FakeWorldsRepository"
import ShowWorldService from "../services/ShowWorldService"

let fakeWorldsRepository: FakeWorldsRepository
let showWorld: ShowWorldService

describe("ShowWorld", () => {
  beforeEach(() => {
    fakeWorldsRepository = new FakeWorldsRepository()

    showWorld = new ShowWorldService(fakeWorldsRepository)
  })

  it("should be able to show world", async () => {
    const world = await fakeWorldsRepository.create({
      user_id: "fake-user-id",
      password: "world_password",
      system_base_id: "fake-rule-id",
      title: "World Test",
    })

    const result = await showWorld.execute({
      worldId: world.id,
    })

    expect(result).toHaveProperty("id")
  })

  it("should not be able to show non-existing world", async () => {
    await expect(
      showWorld.execute({
        worldId: "non-existing-id",
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
