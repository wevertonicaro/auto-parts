import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import moment from 'moment-timezone'
import { User } from './Users'

@Entity('user_tokens')
export class UserToken {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'user_id' })
  userId: number

  @Column()
  token: string

  @Column({ name: 'expires_date' })
  expiresDate: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @OneToOne(() => User, entity => entity.id)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User

  @BeforeInsert()
  insertCreated() {
    this.createdAt = new Date(moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'))
    this.updatedAt = new Date(moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'))
  }

  @BeforeUpdate()
  insertUpdated() {
    this.updatedAt = new Date(moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'))
  }
}