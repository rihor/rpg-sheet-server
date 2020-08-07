import { Exclude } from "class-transformer"
import { Entity, Column, OneToMany, ManyToMany } from "typeorm"

import Character from "@modules/characters/infra/typeorm/entities/Character"
import World from "@modules/worlds/infra/typeorm/entities/World"
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

  @OneToMany(() => World, (world) => world.user_id)
  worldsOwn: World[]

  @ManyToMany(() => World)
  worldsPlaying: World[]

  @OneToMany(() => Character, (character) => character.user_id)
  characters: Character[]
}

export default User
