import { inject, injectable } from "tsyringe"

import CharacterSheetsRepositoryInterface from "@modules/characters/repositories/CharacterSheetsRepositoryInterface"
import SystemBaseRepositoryInterface from "@modules/system/repositories/SystemBaseRepositoryInterface"
import UsersRepositoryInterface from "@modules/users/repositories/UsersRepositoryInterface"
import WorldsRepositoryInterface from "@modules/worlds/repositories/WorldsRepositoryInterface"
import AppError from "@shared/errors/AppError"

import Character from "../infra/typeorm/entities/Character"
import CharactersRepositoryInterface from "../repositories/CharactersRepositoryInterface"

interface Request {
  name: string
  description?: string
  ownerId: string
  worldId: string
}

@injectable()
class CreateCharacterService {
  constructor(
    @inject("CharactersRepository")
    private charactersRepository: CharactersRepositoryInterface,

    @inject("UsersRepository")
    private usersRepository: UsersRepositoryInterface,

    @inject("WorldsRepository")
    private worldsRepository: WorldsRepositoryInterface,

    @inject("SystemBasesRepository")
    private systemBaseRepository: SystemBaseRepositoryInterface,

    @inject("CharacterSheetsRepository")
    private characterSheetsRepository: CharacterSheetsRepositoryInterface
  ) {}

  public async execute({
    name,
    description,
    ownerId,
    worldId,
  }: Request): Promise<Character> {
    const userPromise = this.usersRepository.findById(ownerId)
    const worldPromise = this.worldsRepository.findById(worldId)

    const [user, world] = await Promise.all([userPromise, worldPromise])

    if (!user) {
      throw new AppError("User not found.", 404)
    }

    if (!world) {
      throw new AppError("World not found.", 404)
    }

    const systemBase = await this.systemBaseRepository.findById(
      world.system_base_id
    )

    if (!systemBase) {
      throw new AppError(
        "No rpg system on this world. Try creating a character later.",
        403
      )
    }

    const systemForm = systemBase.formBase

    const sheet = await this.characterSheetsRepository.create({
      health: { current: 10, max: 10 },
      mana: systemForm.hasMana ? { current: 10, max: 10 } : undefined,
      stats: systemForm.stats.map((stat) => ({
        title: stat,
        value: 10,
        modifier: 0,
      })),
      items: [],
      currencies: systemForm.currencies.map((curr) => ({
        title: curr,
        amount: 0,
      })),
      skills: [],
      languages: [],
      spells: [],
      allignment: systemForm.hasAllignment ? "neutral" : undefined,
      race: systemForm.hasRace ? "human" : undefined,
      exp: systemForm.hasExp ? 0 : undefined,
      background: systemForm.hasBackground ? "" : undefined,
      class: systemForm.hasClass ? "" : undefined,
      level: systemForm.hasLevel ? "1" : undefined,
      initiative: systemForm.hasInitiative ? "1" : undefined,
      perception: systemForm.hasPerception ? "1" : undefined,
      speed: systemForm.hasSpeed ? "1" : undefined,
      savingThrow: systemForm ? "" : undefined,
    })

    const character = await this.charactersRepository.create({
      name,
      description,
      user_id: ownerId,
      world_id: worldId,
      sheet_id: sheet.id,
    })

    return character
  }
}

export default CreateCharacterService
