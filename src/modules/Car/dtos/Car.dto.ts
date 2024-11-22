export interface ICreateCarDto {
  id?: number;
  description?: string;
  automakerId?: number;
  createdAt?: Date;
  updateAt?: Date;
}

export interface IUpdateCarDto {
  id?: number;
  description?: string;
  automakerId?: number;
}