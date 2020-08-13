import { ObjectID } from "mongodb"

export default interface CreateWorldDTO {
  title: string
  password: string
  description?: string
  user_id: string
  system_base_id: ObjectID
}
