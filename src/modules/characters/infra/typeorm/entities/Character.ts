import { Entity, Column, JoinColumn, ManyToOne, ObjectID } from "typeorm"

import User from "@modules/users/infra/typeorm/entities/User"
import World from "@modules/worlds/infra/typeorm/entities/World"
import Base from "@shared/infra/typeorm/entities/Base"

@Entity("characters")
class Character extends Base {
  @Column()
  name: string

  @Column({ nullable: true, type: "text" })
  description?: string

  @Column("uuid")
  user_id: string

  @Column("uuid")
  world_id: string

  @Column("uuid")
  sheet_id: ObjectID

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  owner: User

  @ManyToOne(() => World, (world) => world.characters)
  @JoinColumn({ name: "world_id" })
  world: World
}

export default Character
