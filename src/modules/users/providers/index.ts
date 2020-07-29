import { container } from "tsyringe"

import HashProviderInterface from "./HashProvider/models/HashProviderInterface"
import BCrypyHashProvider from "./HashProvider/implementations/BCryptHashProvider"

container.registerSingleton<HashProviderInterface>(
  "HashProvider",
  BCrypyHashProvider
)
