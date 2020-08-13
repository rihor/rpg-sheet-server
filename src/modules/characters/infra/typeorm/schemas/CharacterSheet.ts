import {
  ObjectID,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from "typeorm"

class Mana {
  @Column()
  current: number

  @Column()
  max: number
}

class Currencie {
  @Column()
  title: string

  @Column("float")
  amount: number
}

class Skill {
  @Column()
  title: string

  @Column()
  description?: string

  @Column()
  turnUntilCast?: number

  @Column()
  necessaryMana?: number

  @Column()
  damage?: number

  @Column()
  effects?: string[]
}

class Stat {
  @Column()
  title: string

  @Column()
  value: number

  @Column()
  modifier?: number
}

class Item {
  @Column()
  name: string

  @Column()
  price?: number

  @Column()
  notes?: string
}

class Spell extends Skill {}

type Health = Mana

@Entity("stats")
class CharacterSheet {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  health: Health

  @Column()
  mana?: Mana

  @Column()
  spells: Spell[]

  @Column()
  items: Item[]

  @Column()
  stats: Stat[]

  @Column()
  skills: Skill[]

  @Column()
  currencies: Currencie[]

  @Column()
  allignment?: string

  @Column()
  exp?: number

  @Column()
  background?: string

  @Column()
  race?: string

  @Column()
  level?: string

  @Column()
  class?: string

  @Column()
  initiative?: string

  @Column()
  speed?: string

  @Column()
  perception?: string

  @Column()
  languages: string[]

  @Column()
  savingThrow?: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default CharacterSheet
