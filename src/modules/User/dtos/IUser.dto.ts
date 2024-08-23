export interface ICreateUserDTO {
  id?: number
  name: string
  email: string
  password: string
  phone: string
  active?: boolean
  groupUserId?: number;
  createdAt?: Date
  updatedAt?: Date
}

export interface IUpdateUserDTO {
  id: number
  name?: string
  email?: string
  password?: string
  phone?: string
  active?: boolean
  groupUserId?: number;
  updatedAt?: Date
}

export interface IUserResponseDTO {
  id: number
  name: string
  email: string
  phone: string
  active: boolean
  groupUserId: number;
}