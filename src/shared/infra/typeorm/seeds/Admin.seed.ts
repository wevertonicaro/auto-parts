import { hash } from 'bcryptjs';
import { DataSource } from "typeorm";
import { User } from '../entities/Users';

export default async (connection: DataSource) => {
  const password = await hash("12345678", 8);

  const admin = {
    id: 1,
    name: 'Admin',
    email: 'admin@admin.com.br',
    password: password,
    active: true,
    phone: '6199999-9999',
    groupUserId: 1
  }

  await connection.getRepository(User).insert(admin)
}