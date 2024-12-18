import { Car } from '../../../shared/infra/typeorm/entities/Car'

export interface ICreateCarDto {
    id?: number
    description?: string
    automakerId?: number
    createdAt?: Date
    updateAt?: Date
}

export interface IUpdateCarDto {
    id?: number
    description?: string
    automakerId?: number
}

export interface ImportCarResult {
    totalRecords: number
    importedRecords: Car[]
    duplicateRecords: number
    errorRecords: number
}
