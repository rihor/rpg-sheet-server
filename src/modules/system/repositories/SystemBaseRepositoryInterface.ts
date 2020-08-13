import { ObjectID } from "mongodb"

import CreateSystemBaseDTO from "../dtos/CreateSystemBaseDTO"
import SystemBase from "../infra/typeorm/schemas/SystemBase"

export default interface SystemBaseRepositoryInterface {
  create(data: CreateSystemBaseDTO): Promise<SystemBase>
  findById(id: ObjectID): Promise<SystemBase | undefined>
}
