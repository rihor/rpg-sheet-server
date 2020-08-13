import { Exclude } from "class-transformer"
import {
  Entity,
  Column,
  JoinColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
  ObjectID,
} from "typeorm"

import Character from "@modules/characters/infra/typeorm/entities/Character"
import User from "@modules/users/infra/typeorm/entities/User"
import Base from "@shared/infra/typeorm/entities/Base"

@Entity("worlds")
class World extends Base {
  @Column()
  title: string

  @Exclude()
  @Column()
  password: string

  @Column({ nullable: true, type: "text" })
  description?: string

  @Column("uuid")
  user_id: string

  @Column("varchar")
  system_base_id: ObjectID

  @ManyToMany(() => User)
  @JoinTable({
    name: "world_players",
    joinColumn: { name: "world_id" },
    inverseJoinColumn: { name: "player_id" },
  })
  players: User[]

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  owner: User

  @OneToMany(() => Character, (character) => character.world)
  characters: Character[]
}

export default World
