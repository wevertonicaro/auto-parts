export interface ICreateGroupUserDto {
  id?: number;
  description?: string;
  createdAt?: Date;
  updateAt?: Date;
}

export interface IUpdateGroupUserDto {
  id?: number;
  description?: string;
}