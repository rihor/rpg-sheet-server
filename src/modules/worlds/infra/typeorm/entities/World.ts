import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm"

import Character from "@modules/characters/infra/typeorm/entities/Character"
import User from "@modules/users/infra/typeorm/entities/User"
import Base from "@shared/infra/typeorm/entities/Base"

@Entity("worlds")
class World extends Base {
  @Column()
  title: string

  @Column()
  password: string

  @Column({ nullable: true, type: "text" })
  description?: string

  @Column("uuid")
  user_id: string

  @Column("uuid")
  rule_id: string

  @ManyToMany(() => User)
  @JoinTable({ name: "worlds_players" })
  players: User[]

  @ManyToOne(() => User)
  @JoinColumn({ name: "users_id" })
  owner: User

  @OneToMany(() => Character, (character) => character.world_id)
  characters: Character[]
}

export default World
