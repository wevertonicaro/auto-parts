import moment from "moment-timezone";
import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('group_users')
export class GroupUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @BeforeInsert()
  insertCreated() {
    this.createdAt = new Date(moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'));
    this.updatedAt = new Date(moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'));
  }

  @BeforeUpdate()
  insertUpdated() {
    this.updatedAt = new Date(moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'));
  }
}