import { container } from "tsyringe"

import BCrypyHashProvider from "./HashProvider/BCryptHashProvider"
import HashProviderInterface from "./HashProvider/HashProviderInterface"

container.registerSingleton<HashProviderInterface>(
  "HashProvider",
  BCrypyHashProvider
)
