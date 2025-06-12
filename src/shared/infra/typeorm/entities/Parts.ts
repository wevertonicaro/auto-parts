import moment from 'moment-timezone'
import {
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

@Entity('parts')
export class Parts {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    description: string

    @Column()
    code: string

    @Column()
    price: number

    @Column()
    quantity: number

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
}
