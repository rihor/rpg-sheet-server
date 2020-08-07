import { container } from "tsyringe"

import BCrypyHashProvider from "./BCryptHashProvider"
import HashProviderInterface from "./HashProviderInterface"

const providers = {
  bcrypt: BCrypyHashProvider,
}

container.registerSingleton<HashProviderInterface>(
  "HashProvider",
  providers.bcrypt
)
