import FakeSystemBaseRepository from "../repositories/FakeSystemBaseRepository"
import CreateSystemBaseService from "./CreateSystemBaseService"

let fakeSystemBaseRepository: FakeSystemBaseRepository
let createSystemBase: CreateSystemBaseService

const formBase = {
  currencies: ["gold", "silver"],
  skills: ["swim", "fight"],
  stats: ["strength", "dexterity"],
  hasAllignment: false,
  hasArmor: false,
  hasBackground: false,
  hasClass: false,
  hasExp: false,
  hasInitiative: false,
  hasLevel: false,
  hasMana: false,
  hasMultipleLanguages: false,
  hasPerception: false,
  hasRace: false,
  hasSavingThrows: false,
  hasSpeed: false,
}

describe("CreateSystemBase", () => {
  beforeEach(() => {
    fakeSystemBaseRepository = new FakeSystemBaseRepository()

    createSystemBase = new CreateSystemBaseService(fakeSystemBaseRepository)
  })

  it("should be able to create a new user", async () => {
    const systemBase = await createSystemBase.execute({
      title: "D&D v5",
      description: "Amazing description about the system",
      formBase,
    })

    expect(systemBase).toHaveProperty("id")
  })
})
