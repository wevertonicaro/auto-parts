import { setLocale } from 'yup'
import traducao from '../../../config/translation'
import IErrosYup from './IErrosYup'

setLocale(traducao)

export default async (formSchema, dados: any) => {
    await formSchema.validate(dados, { abortEarly: false }).catch(error => {
        const erros = error.inner.map((err: IErrosYup) => {
            return { message: err.message }
        })
        throw { message: erros }
    })
}
