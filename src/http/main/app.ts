import cors from 'cors'
import 'dotenv/config'
import express, { Application, NextFunction, Request, RequestHandler, Response } from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import 'reflect-metadata'
import { dataBaseConnection } from 'shared/infra/typeorm/database/dataSource'
import swaggerTools from 'swagger-tools'
import swaggerUiExpress, { SwaggerUiOptions } from 'swagger-ui-express'
import { config } from '../../config/api'
import { logger } from '../../utils/logger'
import jsonSwagger from '../../utils/swagger/swagger'
import AppError from '../error/AppError'

export class App {
    public app: Application

    constructor(private port?: number | string) {
        this.app = express()
        this.init()
    }

    private async init() {
        this.setupExpress()
        this.setupRoutes()
        this.errors()
        await this.dataBase()
    }

    private setupExpress() {
        this.app.set('port', config.SERVER.PORT || this.port || 3001)
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(
            morgan('combined', {
                stream: {
                    write: (message: string) => {
                        logger.info(message)
                    },
                },
            })
        )
        this.app.use(
            cors({
                origin: config.SERVER.BASEPATH == '/api' ? config.ALLOW_DOMAINS : '*',
            })
        )
    }

    private setupRoutes() {
        // this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        const swaggerDoc = jsonSwagger;

        const optionsSwagger: SwaggerUiOptions = {
        explorer: false,
        customSiteTitle: config.SERVER.DESCRIPTION,
        swaggerOptions: {
            docExpansion: 'none',
            filter: true,
            layout: 'BaseLayout',
            operationsSorter: 'method',
            tagsSorter: 'alpha',
        },
        };

        swaggerTools.initializeMiddleware(swaggerDoc, (middleware: any) => {
        this.app.use(
            '/docs',
            swaggerUiExpress.serve,
            swaggerUiExpress.setup(swaggerDoc, optionsSwagger)
        );
        this.app.use(middleware.swaggerMetadata() as RequestHandler);
        this.app.use(middleware.swaggerUi() as RequestHandler);
        });
        this.app.use(express.raw({type: '*/*', limit: '10mb',inflate:true}))
    }

    private errors() {
        this.app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
            logger.error(err.message)
            if (err instanceof AppError) {
                return response.status(err.statusCode).json({ message: err.message })
            }
            return response.status(500).json({
                status: 'error',
                message: `Internal server error - ${err.message}`,
            })
        })
    }

    private async dataBase() {
        await dataBaseConnection.initialize()
        .then(() => console.log('Banco de dados conectado com sucesso'))
        .catch(error => {
            console.log(`Error:${error}`)
            throw new AppError(`Não foi possível conectar ao banco de dados! \n ${error.message}`)
        })
    }

    public start() {
        this.app.listen(this.app.get('port'), () => {
            console.log(
                `${config.SERVER.NAME}, rodando na porta ${this.app.get('port')} e processo ${
                    process.pid
                }`
            )
        })
    }
}