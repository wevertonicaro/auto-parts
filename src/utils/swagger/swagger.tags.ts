import { tagsAuth } from "modules/auth/swagger/Auth.swagger"
import { tagsGroupUser } from "modules/GroupUser/swagger/GroupUser.swagger"
import { tagsUser } from "modules/User/swagger/User.swagger"

const tags: Array<Object> = [
  tagsUser,
  tagsGroupUser,
  tagsAuth,
]

export { tags }

