import CreateCharacterSheetDTO from "../dtos/CreateCharacterSheetDTO"
import CharacterSheet from "../infra/typeorm/schemas/CharacterSheet"

export default interface CharacterSheetsRepositoryInterface {
  create(data: CreateCharacterSheetDTO): Promise<CharacterSheet>
}
