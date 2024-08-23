import { DataSource } from "typeorm";
import { GroupUser } from "../entities/GroupUsers";

export default async (connection: DataSource) => {

  const group1 = {
    id: 1,
    description: 'Admin'
  };

  const group2 = {
    id: 2,
    description: 'employee',
  };

  const group3 = {
    id: 3,
    description: 'user',
  };

  await connection.getRepository(GroupUser).insert([group1, group2, group3]);
};