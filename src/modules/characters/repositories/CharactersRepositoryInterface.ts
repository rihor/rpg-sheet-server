import CreateCharacterDTO from "../dtos/CreateCharacterDTO"
import Character from "../infra/typeorm/entities/Character"

export default interface UsersRepositoryInterface {
  create(data: CreateCharacterDTO): Promise<Character>
  save(user: Character): Promise<Character>
}
