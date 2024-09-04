import { loginDefinitions, loginPath } from "../useCases/login/Login.swagger"
import { refreshTokenLoginDefinitions, refreshTokenLoginPath } from "../useCases/refreshToken/RefreshToken.swagger"

const tagsAuth = {
  name: 'Autenticação',
  description: "Processo de validação de login do sistema"
}

const pathAuth: Array<Object> = [
  loginPath,
  refreshTokenLoginPath
]

const definitionsAuth: Array<Object> = [
  loginDefinitions,
  refreshTokenLoginDefinitions  
]

export {
  definitionsAuth, pathAuth, tagsAuth
}

