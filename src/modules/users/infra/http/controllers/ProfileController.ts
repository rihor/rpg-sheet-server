import { classToClass } from "class-transformer"
import { Request, Response } from "express"
import { container } from "tsyringe"

import ShowProfileService from "@modules/users/services/ShowProfileService"
import UpdateProfileService from "@modules/users/services/UpdateProfileService"

export default class UsersController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id

    const showProfile = container.resolve(ShowProfileService)

    const profile = await showProfile.execute({ user_id })

    return response.status(200).json(classToClass(profile))
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, old_password } = request.body
    const user_id = request.user.id

    const createUser = container.resolve(UpdateProfileService)

    const user = await createUser.execute({
      user_id,
      name,
      email,
      password,
      old_password,
    })

    return response.status(200).json(classToClass(user))
  }
}
