import csvParser from 'csv-parser'
import fs from 'fs'
import AppError from '../../../http/error/AppError'

interface CsvReaderOptions {
    delimiter?: string
    headers?: boolean
}

export const readCsv = async <T = Record<string, string>>(
    filePath: string,
    options: CsvReaderOptions = {}
): Promise<T[]> => {
    const { delimiter = ',', headers = ['descricao', 'marca'] } = options

    if (!fs.existsSync(filePath)) {
        throw new AppError('Arquivo CSV não encontrado', 404)
    }

    const results: T[] = []
    try {
        await new Promise<void>((resolve, reject) => {
            fs.createReadStream(filePath)
                .pipe(csvParser({ separator: delimiter, headers }))
                .on('data', data => results.push(data))
                .on('end', () => resolve())
                .on('error', error =>
                    reject(new AppError(`Erro ao ler o arquivo CS. error: ${error.message}`, 500))
                )
        })

        return results
    } catch (error) {
        throw error instanceof AppError
            ? new AppError(`Erro desconhecido ao processar o CSV. error: ${error.message}`, 500)
            : error
    }
}
