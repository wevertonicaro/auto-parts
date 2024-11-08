
export interface ICreateAutomakerDto {
  id?: number;
  description?: string;
  createdAt?: Date;
  updateAt?: Date;
}

export interface IUpdateAutomakerDto {
  id?: number;
  description?: string;
}