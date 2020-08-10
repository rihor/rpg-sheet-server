import { v4 as uuid } from "uuid"

import CreateCharacterDTO from "@modules/characters/dtos/CreateCharacterDTO"
import CharactersRepositoryInterface from "@modules/characters/repositories/CharactersRepositoryInterface"

import Character from "../infra/typeorm/entities/Character"

class UsersRepository implements CharactersRepositoryInterface {
  private characters: Character[] = []

  public async create(characterData: CreateCharacterDTO): Promise<Character> {
    const character = new Character()

    Object.assign(character, { id: uuid() }, characterData)

    this.characters.push(character)

    return character
  }

  public async save(characterToSave: Character): Promise<Character> {
    const findIndex = this.characters.findIndex(
      (character) => character.id === characterToSave.id
    )

    this.characters[findIndex] = characterToSave

    return characterToSave
  }
}

export default UsersRepository
