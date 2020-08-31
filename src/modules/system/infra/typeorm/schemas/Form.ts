import { Column } from "typeorm"

class Form {
  @Column({ type: "array", default: [] })
  stats: string[]

  @Column({ type: "array", default: [] })
  currencies: string[]

  @Column({ type: "boolean", default: true })
  hasMana = true

  @Column({ type: "boolean", default: true })
  hasAllignment = true

  @Column({ type: "boolean", default: true })
  hasExp = true

  @Column({ type: "boolean", default: true })
  hasBackground = true

  @Column({ type: "boolean", default: true })
  hasRace = true

  @Column({ type: "boolean", default: true })
  hasLevel = true

  @Column({ type: "boolean", default: true })
  hasClass = true

  @Column({ type: "boolean", default: true })
  hasInitiative = true

  @Column({ type: "boolean", default: true })
  hasSpeed = true

  @Column({ type: "boolean", default: true })
  hasPerception = true

  @Column({ type: "boolean", default: true })
  hasArmor = true

  @Column({ type: "boolean", default: true })
  hasSavingThrows = true
}

export default Form
