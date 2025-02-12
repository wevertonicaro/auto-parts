export interface ICreateCarModelDto {
    description: string
    carId: number
    id?: number
    createdAt?: Date
    updateAt?: Date
}

export interface IUpdateCarModelDto {
    id?: number
    description?: string
    carId?: number
}
