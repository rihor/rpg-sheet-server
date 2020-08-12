import Form from "../infra/typeorm/schemas/Form"

export default interface CreateSystemBaseDTO {
  title: string
  description: string
  formBase: Form
}
