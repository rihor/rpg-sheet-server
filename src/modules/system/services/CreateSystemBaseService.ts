import { inject, injectable } from "tsyringe"

import Form from "../infra/typeorm/schemas/Form"
import SystemBase from "../infra/typeorm/schemas/SystemBase"
import SystemBaseRepositoryInterface from "../repositories/SystemBaseRepositoryInterface"

interface Request {
  title: string
  description: string
  formBase: Form
}

@injectable()
class CreateSystemBaseService {
  constructor(
    @inject("SystemBasesRepository")
    private systemBaseRepository: SystemBaseRepositoryInterface
  ) {}

  async execute({
    title,
    description,
    formBase,
  }: Request): Promise<SystemBase> {
    const systemBase = await this.systemBaseRepository.create({
      title,
      description,
      formBase,
    })

    return systemBase
  }
}

export default CreateSystemBaseService
