import { config } from '../../config/api'
import { definitions } from './swagger.definitions'
import { parameters } from './swagger.parameters'
import { paths } from './swagger.paths'
import { tags } from './swagger.tags'

export default {
    swagger: '2.0',
    info: {
        description: config.SERVER.DESCRIPTION,
        version: '1.0.0',
        title: config.SERVER.NAME,
        contact: {
            email: config.SHARED.CONTACT,
        },
    },
    host: config.SERVER.HOST,
    basePath: config.SERVER.BASEPATH,
    tags,
    schemes: ['http'],
    securityDefinitions: {
        Bearer: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header',
        },
    },
    parameters: parameters,
    paths,
    definitions,
}
