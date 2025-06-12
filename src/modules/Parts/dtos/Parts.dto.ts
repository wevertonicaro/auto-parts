export interface ICreatePartsDto {
    id?: number
    description?: string
    code?: string
    price?: number
    quantity?: number
    carModelId?: Array<number>
    createdAt?: Date
    updateAt?: Date
}

export interface IUpdatePartsDto {
    id?: number
    description?: string
    code?: string
    price?: number
    quantity?: number
}
