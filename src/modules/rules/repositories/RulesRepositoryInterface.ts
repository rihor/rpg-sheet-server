import Rule from "../infra/schemas/Rule"

export default interface RulesRepositoryInterface {
  create(data: Record<string, unknown>): Promise<Rule>
}
