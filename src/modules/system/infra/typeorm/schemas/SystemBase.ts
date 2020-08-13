import {
  ObjectID,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  Index,
} from "typeorm"

import Form from "./Form"

@Entity("system_bases")
@Index(["title"], { unique: true })
class SystemBase {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  title: string

  @Column()
  description: string

  @Column()
  formBase: Form

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}

export default SystemBase
