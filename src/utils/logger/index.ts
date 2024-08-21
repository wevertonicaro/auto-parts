import winston from 'winston'

const fileTransport = new winston.transports.File({
    filename: 'logs/access.log',
    level: 'info',
})

const errorFileTransport = new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
})

const logger = winston.createLogger({
    format: winston.format.json(),
    transports: [fileTransport, errorFileTransport],
})

export { logger }
