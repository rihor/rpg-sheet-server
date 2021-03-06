import { getRepository, Repository } from "typeorm"

import CreateCharacterDTO from "@modules/characters/dtos/CreateCharacterDTO"
import CharactersRepositoryInterface from "@modules/characters/repositories/CharactersRepositoryInterface"

import Character from "../entities/Character"

class CharactersRepository implements CharactersRepositoryInterface {
  private ormRepository: Repository<Character>

  constructor() {
    this.ormRepository = getRepository(Character)
  }

  public async create(characterData: CreateCharacterDTO): Promise<Character> {
    const character = await this.ormRepository.create(characterData)

    await this.ormRepository.save(character)

    return character
  }

  public async save(character: Character): Promise<Character> {
    return this.ormRepository.save(character)
  }
}

export default CharactersRepository
