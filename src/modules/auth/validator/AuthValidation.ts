import * as yup from 'yup'

export const authenticateValidation = yup.object().shape({
  email: yup.string().email().required().label('Email obrigatório'),
  password: yup.string().required().label('Senha obrigatória'),
})


export const refreshTokenAuthenticateValidation = yup.object().shape({
  token: yup.string().required().label('Token obrigatório'),
})