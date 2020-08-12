import { getMongoRepository, MongoRepository } from "typeorm"

import CreateSystemBaseDTO from "@modules/system/dtos/CreateSystemBaseDTO"
import SystemBaseRepositoryInterface from "@modules/system/repositories/SystemBaseRepositoryInterface"

import SystemBase from "../schemas/SystemBase"

class SystemBaseRepository implements SystemBaseRepositoryInterface {
  private ormRepository: MongoRepository<SystemBase>

  constructor() {
    this.ormRepository = getMongoRepository(SystemBase, "mongo")
  }

  async create(data: CreateSystemBaseDTO): Promise<SystemBase> {
    const systemBase = this.ormRepository.create(data)

    await this.ormRepository.save(systemBase)

    return systemBase
  }
}

export default SystemBaseRepository
