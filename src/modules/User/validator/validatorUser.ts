import * as yup from 'yup';

export const createUserValidator = yup.object().shape({
  name: yup.string().required().label('Nome'),
  password: yup.string().min(8, 'A senha deve conter pelo menos 8 caracteres').required().label('Senha'),
  email: yup.string().email().required().label('Email'),
  phone: yup.string().label('Telefone')
})

export const updateUserValidator = yup.object().shape({
  id: yup.number().required().label('Id do usuário'),
  name: yup.string().label('Nome'),
  password: yup.string().min(8, 'A senha deve conter pelo menos 8 caracteres').label('Senha'),
  email: yup.string().email().label('Email'),
  phone: yup.string().label('Telefone')
})