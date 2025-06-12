import winston from 'winston'
import 'winston-mongodb'
import { config } from '../../../config/api'

const infoTransport = new winston.transports.MongoDB({
    db: config.MONGO.URI,
    collection: 'logs_info',
    level: 'info',
    tryReconnect: true,
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
})

const errorTransport = new winston.transports.MongoDB({
    db: config.MONGO.URI,
    collection: 'logs_error',
    level: 'error',
    tryReconnect: true,
    format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
})

const logger = winston.createLogger({
    transports: [infoTransport, errorTransport],
})

export { logger }
