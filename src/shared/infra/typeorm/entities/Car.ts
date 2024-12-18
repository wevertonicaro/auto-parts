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
import { Automaker } from './Automaker'

@Entity('cars')
export class Car {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column({ name: 'automaker_id' })
    automakerId: number

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date

    @BeforeInsert()
    insertCreated() {
        this.createdAt = new Date(moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'))
        this.updatedAt = new Date(moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'))
    }

    @BeforeUpdate()
    insertUpdated() {
        this.updatedAt = new Date(moment().tz('America/Sao_Paulo').format('YYYY-MM-DD HH:mm:ss'))
    }

    @ManyToOne(() => Automaker, entidade => entidade.id)
    @JoinColumn({ name: 'automaker_id', referencedColumnName: 'id' })
    Montadora: Automaker
}
