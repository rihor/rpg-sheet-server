import {
  ObjectID,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from "typeorm"

export interface Stats {
  [key: string]: string | number
}

@Entity("rules")
class Rule {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  stats: Stats

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default Rule
