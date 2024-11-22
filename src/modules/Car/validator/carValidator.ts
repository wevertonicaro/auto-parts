import * as yup from 'yup';

export const createCarValidator = yup.object().shape({
  description: yup.string().required().label('Nome do veículo'),
  automakerId: yup.number().required().label('Código da Montadora')
})

export const updateCarValidator = yup.object().shape({
  id: yup.number().required().label('Id veículo'),
  description: yup.string().nullable().label('Nome do veículo'),
})