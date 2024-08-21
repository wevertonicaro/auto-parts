import moment from 'moment-timezone'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { GroupUser } from './GroupUsers'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'username' })
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  active: boolean

  @Column()
  phone: string

  @Column()
  groupUserId: number

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

  @ManyToOne(() => GroupUser, (entidade) => entidade.id)
  @JoinColumn({ name: "groupUserId", referencedColumnName: "id" })
  Grupo: GroupUser
}