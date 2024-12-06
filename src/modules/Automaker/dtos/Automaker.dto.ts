export interface ICreateAutomakerDto {
    id?: number
    description?: string
    createdAt?: Date
    updateAt?: Date
}

export interface IUpdateAutomakerDto {
    id?: number
    description?: string
}

export interface ImportAutomakerResult {
    totalRecords: number
    importedRecords: number
    duplicateRecords: number
}
