import { classToClass } from "class-transformer"
import { Request, Response } from "express"
import { container } from "tsyringe"

import CreateCharacterService from "@modules/characters/services/CreateCharacterService"

export default class CharactersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, description, worldId, ownerId } = request.body

    const createCharacter = container.resolve(CreateCharacterService)

    const character = await createCharacter.execute({
      name,
      description,
      ownerId: ownerId,
      worldId: worldId,
    })

    return response.status(201).json(classToClass(character))
  }
}
