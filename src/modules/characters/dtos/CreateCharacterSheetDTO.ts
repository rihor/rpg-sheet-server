interface Skill {
  title: string
  description?: string
  turnUntilCast?: number
  necessaryMana?: number
  damage?: number
  effects?: string[]
}

interface Item {
  name: string
  price?: number
  notes?: string
}

interface Stat {
  title: string
  value: number
  modifier?: number
}

interface Currencie {
  title: string
  amount: number
}

export default interface CreateCharacterDTO {
  health: {
    current: number
    max: number
  }
  mana?: {
    current: number
    max: number
  }
  spells: Skill[]
  items: Item[]
  stats: Stat[]
  skills: Skill[]
  currencies: Currencie[]
  allignment?: string
  exp?: number
  background?: string
  race?: string
  level?: string
  class?: string
  initiative?: string
  speed?: string
  perception?: string
  languages: string[]
  savingThrow?: string
}
