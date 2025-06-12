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
import { CarModel } from './CarModel'
import { Parts } from './Parts'

@Entity('parts_models_relations')
export class PartsModelsRelations {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ name: 'car_model_id' })
    carModelId: number

    @Column({ name: 'part_id' })
    partId: number

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

    @ManyToOne(() => CarModel, entity => entity.id)
    @JoinColumn({ name: 'car_model_id' })
    CarModel: CarModel

    @ManyToOne(() => Parts, entity => entity.id)
    @JoinColumn({ name: 'part_id' })
    Part: Parts
}
