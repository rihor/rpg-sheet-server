import { getMongoRepository, MongoRepository } from "typeorm"

import CreateCharacterSheetDTO from "@modules/characters/dtos/CreateCharacterSheetDTO"
import CharacterSheetsRepositoryInterface from "@modules/characters/repositories/CharacterSheetsRepositoryInterface"

import CharacterSheet from "../schemas/CharacterSheet"

class CharacterSheetsRepository implements CharacterSheetsRepositoryInterface {
  private ormRepository: MongoRepository<CharacterSheet>

  constructor() {
    this.ormRepository = getMongoRepository(CharacterSheet, "mongo")
  }

  public async create(data: CreateCharacterSheetDTO): Promise<CharacterSheet> {
    const characterSheet = this.ormRepository.create(data)

    await this.ormRepository.save(characterSheet)

    return characterSheet
  }

  public async save(character: CharacterSheet): Promise<CharacterSheet> {
    return this.ormRepository.save(character)
  }
}

export default CharacterSheetsRepository
