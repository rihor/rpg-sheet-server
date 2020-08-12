import { Column } from "typeorm"

class Form {
  @Column({ type: "array", default: [] })
  stats: string[]

  @Column({ type: "array", default: [] })
  skills: string[]

  @Column({ type: "array", default: [] })
  currencies: string[]

  @Column({ type: "boolean", default: true })
  hasMana: boolean

  @Column({ type: "boolean", default: true })
  hasAllignment: boolean

  @Column({ type: "boolean", default: true })
  hasExp: boolean

  @Column({ type: "boolean", default: true })
  hasBackground: boolean

  @Column({ type: "boolean", default: true })
  hasRace: boolean

  @Column({ type: "boolean", default: true })
  hasLevel: boolean

  @Column({ type: "boolean", default: true })
  hasClass: boolean

  @Column({ type: "boolean", default: true })
  hasInitiative: boolean

  @Column({ type: "boolean", default: true })
  hasSpeed: boolean

  @Column({ type: "boolean", default: true })
  hasPerception: boolean

  @Column({ type: "boolean", default: true })
  hasArmor: boolean

  @Column({ type: "boolean", default: true })
  hasMultipleLanguages: boolean

  @Column({ type: "boolean", default: true })
  hasSavingThrows: boolean
}

export default Form
