import CreateSystemBaseDTO from "../dtos/CreateSystemBaseDTO"
import SystemBase from "../infra/typeorm/schemas/SystemBase"

export default interface SystemBaseRepositoryInterface {
  create(data: CreateSystemBaseDTO): Promise<SystemBase>
}
