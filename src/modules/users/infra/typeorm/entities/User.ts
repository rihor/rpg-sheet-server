import { Entity, Column } from "typeorm"
import { Exclude } from "class-transformer"
import Base from "@shared/infra/typeorm/entities/Base"

@Entity("users")
class User extends Base {
  @Column()
  name: string

  @Column()
  email: string

  @Column()
  @Exclude()
  password: string
}

export default User
