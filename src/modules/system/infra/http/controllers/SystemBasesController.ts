import { Request, Response } from "express"
import { container } from "tsyringe"

import CreateSystemBaseService from "@modules/system/services/CreateSystemBaseService"

class SystemBasesController {
  async create(request: Request, response: Response): Promise<Response> {
    const { title, description, formBase } = request.body

    const createSystemBase = container.resolve(CreateSystemBaseService)

    const systemBase = await createSystemBase.execute({
      title,
      description,
      formBase,
    })

    return response.status(201).json(systemBase)
  }
}

export default SystemBasesController
