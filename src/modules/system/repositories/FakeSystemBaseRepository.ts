import { ObjectID } from "mongodb"

import CreateSystemBaseDTO from "@modules/system/dtos/CreateSystemBaseDTO"
import SystemBaseRepositoryInterface from "@modules/system/repositories/SystemBaseRepositoryInterface"

import SystemBase from "../infra/typeorm/schemas/SystemBase"

class FakeSystemBaseRepository implements SystemBaseRepositoryInterface {
  private systemBases: SystemBase[] = []

  async create(data: CreateSystemBaseDTO): Promise<SystemBase> {
    const systemBase = new SystemBase()

    Object.assign(systemBase, { id: new ObjectID() }, data)

    this.systemBases.push(systemBase)

    return systemBase
  }

  async findById(id: ObjectID): Promise<SystemBase | undefined> {
    const systemBase = this.systemBases.find((sB) => sB.id === id)

    return systemBase
  }
}

export default FakeSystemBaseRepository
