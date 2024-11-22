import * as yup from 'yup';

export const createAutomakerValidator = yup.object().shape({
  description: yup.string().required().label('Nome da montadora.')
})

export const updateAutomakerValidator = yup.object().shape({
  id: yup.number().required().label('Id montadora'),
  description: yup.string().nullable().label('Nome da montadora.')
})