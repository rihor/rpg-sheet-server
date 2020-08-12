import {
  ObjectID,
  Column,
  ObjectIdColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from "typeorm"

import Form from "./Form"

@Entity("system_bases")
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
