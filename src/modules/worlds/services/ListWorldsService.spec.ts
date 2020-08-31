import { ObjectID } from "mongodb"

import FakeWorldsRepository from "../repositories/FakeWorldsRepository"
import ListWorldsService from "./ListWorldsService"

let fakeWorldsRepository: FakeWorldsRepository
let listWorlds: ListWorldsService

describe("ListWorlds", () => {
  beforeEach(() => {
    fakeWorldsRepository = new FakeWorldsRepository()

    listWorlds = new ListWorldsService(fakeWorldsRepository)
  })

  it("should be able to show world", async () => {
    const world = await fakeWorldsRepository.create({
      user_id: "fake-user-id",
      password: "world_password",
      system_base_id: new ObjectID(),
      title: "World Test",
    })

    const result = await listWorlds.execute({
      title: "World",
      page: 1,
      perPage: 10,
    })

    expect(result.worlds).toContain(world)
  })
})
