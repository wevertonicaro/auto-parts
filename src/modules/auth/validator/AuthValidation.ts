import * as yup from 'yup'

const validateJWT = value => {
    const jwtRegex = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/
    if (!jwtRegex.test(value)) {
        throw new yup.ValidationError('Token inválido')
    }
    return value
}

export const authenticateValidation = yup.object().shape({
    email: yup.string().email().required().label('Email obrigatório'),
    password: yup.string().required().label('Senha obrigatória'),
})

export const refreshTokenAuthenticateValidation = yup.object().shape({
    token: yup.string().required('Token obrigatório').test('is-jwt', 'Token inválido', validateJWT),
})
