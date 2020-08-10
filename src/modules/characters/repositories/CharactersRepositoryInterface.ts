import CreateCharacterDTO from "../dtos/CreateCharacterDTO"
import Character from "../infra/typeorm/entities/Character"

export default interface CharactersRepositoryInterface {
  create(data: CreateCharacterDTO): Promise<Character>
  save(character: Character): Promise<Character>
}
