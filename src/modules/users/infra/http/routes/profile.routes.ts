import { Router } from "express"

import ProfileController from "../controllers/ProfileController"
import ensureAuthenticated from "../middlewares/ensureAuthenticated"
import { updateProfileValidator } from "../validators/profile.validator"

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.use(ensureAuthenticated)

profileRouter.get("/", profileController.show)
profileRouter.put("/", updateProfileValidator, profileController.update)

export default profileRouter
