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
import { Car } from './Car'

@Entity('models')
export class Model {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column({ name: 'car_id' })
    carId: number

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

    @ManyToOne(() => Car, entidade => entidade.id)
    @JoinColumn({ name: 'car_id', referencedColumnName: 'id' })
    Veiculo: Car
}
