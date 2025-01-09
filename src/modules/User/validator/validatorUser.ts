import * as yup from 'yup'

export const createUserValidator = yup.object().shape({
    name: yup
        .string()
        .min(3, 'O nome deve ter pelo menos 3 caracteres')
        .max(50, 'O nome não pode exceder 50 caracteres')
        .required('O campo Nome é obrigatório')
        .label('Nome'),
    password: yup
        .string()
        .min(8, 'A senha deve conter pelo menos 8 caracteres')
        .required('O campo Senha é obrigatório')
        .label('Senha'),
    email: yup
        .string()
        .email('O email deve ser válido')
        .required('O campo Email é obrigatório')
        .label('Email'),
    phone: yup.string().label('Telefone'),
})

export const updateUserValidator = yup.object().shape({
    id: yup.number().required('O campo Id do usuário é obrigatório').label('Id do usuário'),
    name: yup
        .string()
        .min(3, 'O nome deve ter pelo menos 3 caracteres')
        .max(50, 'O nome não pode exceder 50 caracteres')
        .label('Nome'),
    password: yup.string().min(8, 'A senha deve conter pelo menos 8 caracteres').label('Senha'),
    email: yup.string().email('O email deve ser válido').label('Email'),
    phone: yup.string().label('Telefone'),
})
