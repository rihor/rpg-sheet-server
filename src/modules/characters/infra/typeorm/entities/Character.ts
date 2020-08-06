import { Entity, Column, JoinColumn, ManyToOne } from "typeorm"

import User from "@modules/users/infra/typeorm/entities/User"
import World from "@modules/worlds/infra/typeorm/entities/World"
import Base from "@shared/infra/typeorm/entities/Base"

@Entity("characters")
class Character extends Base {
  @Column()
  name: string

  @Column({ nullable: true, type: "text" })
  description?: string

  @ManyToOne(() => User)
  @JoinColumn({ name: "users_id" })
  owner: User

  @ManyToOne(() => World)
  @JoinColumn({ name: "worlds_id" })
  world: World

  @Column()
  users_id: string

  @Column()
  worlds_id: string
}

export default Character
