import * as yup from 'yup';

export const createGroupUserValidator = yup.object().shape({
  description: yup.string().required().label('Descrição do grupo')
})

export const updateGroupUserValidator = yup.object().shape({
  id: yup.number().required().label('Id grupo'),
  description: yup.string().nullable().label('Descrição do grupo')
})