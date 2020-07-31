import { container } from "tsyringe"

import HashProviderInterface from "./HashProvider/HashProviderInterface"
import BCrypyHashProvider from "./HashProvider/BCryptHashProvider"

container.registerSingleton<HashProviderInterface>(
  "HashProvider",
  BCrypyHashProvider
)
