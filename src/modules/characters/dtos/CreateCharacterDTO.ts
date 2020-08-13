import { ObjectID } from "mongodb"

export default interface CreateCharacterDTO {
  name: string
  description?: string
  user_id: string
  world_id: string
  sheet_id: ObjectID
}
