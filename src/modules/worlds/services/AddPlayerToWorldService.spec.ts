import FakeUsersRepository from "@modules/users/repositories/FakeUsersRepository"
import FakeHashProvider from "@shared/container/providers/HashProvider/FakeHashProvider"
import AppError from "@shared/errors/AppError"

import FakeWorldPlayersRepository from "../repositories/FakeWorldPlayersRepository"
import FakeWorldsRepository from "../repositories/FakeWorldsRepository"
import AddPlayerToWorld from "./AddPlayerToWorldService"

let fakeWorldPlayersRepository: FakeWorldPlayersRepository
let fakeWorldsRepository: FakeWorldsRepository
let fakeUsersRepository: FakeUsersRepository
let fakeHashProvider: FakeHashProvider
let addPlayerToWorld: AddPlayerToWorld

describe("AddPlayerToWorld", () => {
  beforeEach(() => {
    fakeWorldPlayersRepository = new FakeWorldPlayersRepository()
    fakeWorldsRepository = new FakeWorldsRepository()
    fakeUsersRepository = new FakeUsersRepository()
    fakeHashProvider = new FakeHashProvider()

    addPlayerToWorld = new AddPlayerToWorld(
      fakeWorldPlayersRepository,
      fakeWorldsRepository,
      fakeUsersRepository,
      fakeHashProvider
    )
  })

  it("should be able to add player a world", async () => {
    const worldOwner = await fakeUsersRepository.create({
      name: "World Owner",
      email: "world@owner.com",
      password: "123456",
    })

    const player = await fakeUsersRepository.create({
      name: "Player",
      email: "player@email.com",
      password: "123456",
    })

    const world = await fakeWorldsRepository.create({
      title: "World",
      password: "world_pass",
      system_base_id: "system_base_id",
      user_id: worldOwner.id,
      description: "Description",
    })

    const worldPlayer = await addPlayerToWorld.execute({
      password: "world_pass",
      playerId: player.id,
      worldId: world.id,
    })

    expect(worldPlayer).toHaveProperty("id")
    expect(worldPlayer.world_id).toEqual(world.id)
    expect(worldPlayer.player_id).toEqual(player.id)
  })

  it("should be able to return an already created player to world", async () => {
    const worldOwner = await fakeUsersRepository.create({
      name: "World Owner",
      email: "world@owner.com",
      password: "123456",
    })

    const player = await fakeUsersRepository.create({
      name: "Player",
      email: "player@email.com",
      password: "123456",
    })

    const world = await fakeWorldsRepository.create({
      title: "World",
      password: "world_pass",
      system_base_id: "system_base_id",
      user_id: worldOwner.id,
      description: "Description",
    })

    await addPlayerToWorld.execute({
      password: "world_pass",
      playerId: player.id,
      worldId: world.id,
    })

    const worldPlayer = await addPlayerToWorld.execute({
      password: "world_pass",
      playerId: player.id,
      worldId: world.id,
    })

    expect(worldPlayer).toHaveProperty("id")
    expect(worldPlayer.world_id).toEqual(world.id)
    expect(worldPlayer.player_id).toEqual(player.id)
  })

  it("should not be able to add non-existing user to world", async () => {
    const worldOwner = await fakeUsersRepository.create({
      name: "World Owner",
      email: "world@owner.com",
      password: "123456",
    })

    const world = await fakeWorldsRepository.create({
      title: "World",
      password: "world_pass",
      system_base_id: "system_base_id",
      user_id: worldOwner.id,
      description: "Description",
    })

    await expect(
      addPlayerToWorld.execute({
        password: "world_pass",
        playerId: "non-existing_id",
        worldId: world.id,
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to add user to non-existing world", async () => {
    const user = await fakeUsersRepository.create({
      name: "user",
      email: "user@player.com",
      password: "123456",
    })

    await expect(
      addPlayerToWorld.execute({
        password: "world_pass",
        playerId: user.id,
        worldId: "non-existing_id",
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to add player with wrong world password", async () => {
    const worldOwner = await fakeUsersRepository.create({
      name: "World Owner",
      email: "world@owner.com",
      password: "123456",
    })

    const player = await fakeUsersRepository.create({
      name: "Player",
      email: "player@email.com",
      password: "123456",
    })

    const world = await fakeWorldsRepository.create({
      title: "World",
      password: "world_pass",
      system_base_id: "system_base_id",
      user_id: worldOwner.id,
      description: "Description",
    })

    await expect(
      addPlayerToWorld.execute({
        password: "WRONG_world_pass",
        playerId: player.id,
        worldId: world.id,
      })
    ).rejects.toBeInstanceOf(AppError)
  })

  it("should not be able to add world owner as a player", async () => {
    const worldOwner = await fakeUsersRepository.create({
      name: "World Owner",
      email: "world@owner.com",
      password: "123456",
    })

    const world = await fakeWorldsRepository.create({
      title: "World",
      password: "world_pass",
      system_base_id: "system_base_id",
      user_id: worldOwner.id,
      description: "Description",
    })

    await expect(
      addPlayerToWorld.execute({
        password: "world_pass",
        playerId: worldOwner.id,
        worldId: world.id,
      })
    ).rejects.toBeInstanceOf(AppError)
  })
})
