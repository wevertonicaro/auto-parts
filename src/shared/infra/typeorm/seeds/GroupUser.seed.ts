import { DataSource } from "typeorm";
import { GroupUser } from "../entities/GroupUsers";

export default async (connection: DataSource) => {

  const groups = [
    { id: 1, description: 'Admin' },
    { id: 2, description: 'employee' },
    { id: 3, description: 'user' },
  ];

  await connection.getRepository(GroupUser).upsert(groups, ['description']);
};