import * as yup from 'yup';

export const createAutomakerValidator = yup.object().shape({
  description: yup.string().required().label('Descrição do grupo')
})

export const updateAutomakerValidator = yup.object().shape({
  id: yup.number().required().label('Id empresa'),
  description: yup.string().nullable().label('Descrição do grupo')
})