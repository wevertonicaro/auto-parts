import * as yup from 'yup'

export const createPartsValidator = yup.object().shape({
    description: yup.string().required().label('Descrição da peça.'),
    code: yup.string().required().label('Código da peça.'),
    price: yup.number().required().label('Preço da peça.'),
    quantity: yup.number().required().label('Quantidade de peças.'),
    carModelId: yup.number().required().label('Id do modelo do veículo.'),
})

export const updatePartsValidator = yup.object().shape({
    id: yup.number().required().label('Id da peça.'),
    description: yup.string().nullable().label('Descrição da peça.'),
    code: yup.string().nullable().label('Código da peça.'),
    price: yup.number().nullable().label('Preço da peça.'),
    quantity: yup.number().nullable().label('Quantidade de peças.'),
    carModelId: yup.number().nullable().label('Id do modelo do veículo.'),
})
