import { inject, injectable } from "tsyringe"

import World from "../infra/typeorm/entities/World"
import WorldsRepositoryInterface from "../repositories/WorldsRepositoryInterface"

interface Request {
  title: string
  page: number
  perPage: number
}

interface Response {
  worlds: World[]
  count: number
  page: number
}

@injectable()
class ListWorldsService {
  constructor(
    @inject("WorldsRepository")
    private worldsRepository: WorldsRepositoryInterface
  ) {}

  public async execute({ title, page, perPage }: Request): Promise<Response> {
    const { worlds, count } = await this.worldsRepository.findAllByTitle({
      title,
      page,
      perPage,
    })

    return {
      worlds,
      count,
      page,
    }
  }
}

export default ListWorldsService
