import { Entity, Column, OneToOne, JoinColumn } from "typeorm"

import User from "@modules/users/infra/typeorm/entities/User"
import World from "@modules/worlds/infra/typeorm/entities/World"
import Base from "@shared/infra/typeorm/entities/Base"

@Entity("world_players")
class WorldPlayer extends Base {
  @Column("uuid")
  player_id: string

  @Column("uuid")
  world_id: string

  @OneToOne(() => User)
  @JoinColumn({ name: "player_id" })
  player: User

  @OneToOne(() => World)
  @JoinColumn({ name: "world_id" })
  world: World
}

export default WorldPlayer
