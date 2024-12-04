import fs from 'fs'
import xlsx from 'xlsx'
import AppError from '../../http/error/AppError'

export const readExcel = async <T = Record<string, any>>(
    filePath: string,
    sheetName?: string
): Promise<T[]> => {
    try {
        if (!fs.existsSync(filePath)) {
            throw new AppError('Arquivo Excel não encontrado', 404)
        }

        const workbook = xlsx.readFile(filePath)

        const sheet = sheetName
            ? workbook.Sheets[sheetName]
            : workbook.Sheets[workbook.SheetNames[0]]

        if (!sheet) {
            throw new AppError('Planilha não encontrada.', 404)
        }

        const data = xlsx.utils.sheet_to_json<T>(sheet, { header: 1 })

        return data
    } catch (error) {
        if (error instanceof AppError) {
            throw error
        }

        throw new AppError(`Erro ao ler o arquivo Excel: ${error.message}`, 500)
    }
}
