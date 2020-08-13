import { ObjectID } from "mongodb"

import CreateCharacterSheetDTO from "@modules/characters/dtos/CreateCharacterSheetDTO"
import CharacterSheetsRepositoryInterface from "@modules/characters/repositories/CharacterSheetsRepositoryInterface"

import CharacterSheet from "../infra/typeorm/schemas/CharacterSheet"

class FakeCharacterSheetsRepository
  implements CharacterSheetsRepositoryInterface {
  private characterSheets: CharacterSheet[] = []

  public async create(
    characterSheetData: CreateCharacterSheetDTO
  ): Promise<CharacterSheet> {
    const characterSheet = new CharacterSheet()

    Object.assign(characterSheet, { id: new ObjectID() }, characterSheetData)

    this.characterSheets.push(characterSheet)

    return characterSheet
  }

  public async save(sheetToSave: CharacterSheet): Promise<CharacterSheet> {
    const findIndex = this.characterSheets.findIndex(
      (sheet) => sheet.id === sheetToSave.id
    )

    this.characterSheets[findIndex] = sheetToSave

    return sheetToSave
  }
}

export default FakeCharacterSheetsRepository
