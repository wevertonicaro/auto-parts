const createAutomakerPath = {
    '/automakers': {
        post: {
            tags: ['Montadoras'],
            summary: 'Criar um nova montadora',
            consumes: ['application/json'],
            produces: ['application/json'],
            security: [
                {
                    Bearer: [],
                },
            ],
            parameters: [
                {
                    name: 'body',
                    in: 'body',
                    description: 'Objeto JSON contendo a descrição da montadora.',
                    schema: {
                        $ref: '#/definitions/requestCreateAutomaker',
                    },
                },
            ],
            responses: {
                201: {
                    description: 'Montadora criada com sucesso',
                    schema: {
                        $ref: '#/definitions/responseCreateAutomaker',
                    },
                },
                400: {
                    description: 'Erro ao criar a montadora.',
                    schema: {
                        $ref: '#/definitions/errorResponse',
                    },
                },
            },
        },
    },
}

const createAutomakerDefinitions = [
    {
        requestCreateAutomaker: {
            type: 'object',
            required: ['description'],
            properties: {
                description: {
                    type: 'string',
                    description: 'Nome da montadora.',
                },
            },
        },
    },
    {
        responseCreateAutomaker: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                },
                description: {
                    type: 'string',
                },
                createdAt: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Data de criação da peça.',
                },
                updatedAt: {
                    type: 'string',
                    format: 'date-time',
                    description: 'Data da última atualização da peça.',
                },
            },
        },
    },
]

export { createAutomakerDefinitions, createAutomakerPath }
