import * as yup from 'yup'

export const createCarModelValidator = yup.object().shape({
    description: yup.string().required().label('Descrição do modelo do veículo.'),
    carId: yup.number().required().label('Id do veículo.'),
})

export const updateCarModelValidator = yup.object().shape({
    id: yup.number().required().label('Id do modelo do veículo.'),
    description: yup.string().nullable().label('Descrição do modelo do veículo.'),
    carId: yup.number().required().label('Id do veículo.'),
})
