const createPartsPath = {
    '/parts': {
        post: {
            tags: ['Peças'],
            summary: 'Criar uma nova peça',
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
                    description: 'Objeto JSON contendo as informações da peça.',
                    required: true,
                    schema: {
                        $ref: '#/definitions/requestCreateParts',
                    },
                },
            ],
            responses: {
                201: {
                    description: 'Peça criada com sucesso',
                    schema: {
                        $ref: '#/definitions/responseCreateParts',
                    },
                },
                400: {
                    description: 'Erro ao criar a peça',
                    schema: {
                        $ref: '#/definitions/errorResponse',
                    },
                },
            },
        },
    },
}

const createPartsDefinitions = [
    {
        requestCreateParts: {
            type: 'object',
            required: ['description', 'carModelId', 'price', 'quantity'],
            properties: {
                description: {
                    type: 'string',
                    description: 'Descrição da peça.',
                },
                carModelId: {
                    type: 'array',
                    items: {
                        type: 'integer',
                    },
                    description: 'Lista de IDs dos modelos de veículo associados à peça.',
                },
                price: {
                    type: 'number',
                    format: 'float',
                    description: 'Preço da peça.',
                    minimum: 0,
                    example: 100.5,
                },
                quantity: {
                    type: 'integer',
                    description: 'Quantidade disponível da peça.',
                },
            },
        },
    },
    {
        responseCreateParts: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                    description: 'Id da peça.',
                },
                description: {
                    type: 'string',
                    description: 'Descrição da peça.',
                },
                carModelId: {
                    type: 'array',
                    items: {
                        type: 'integer',
                    },
                    description: 'Lista de IDs dos modelos de veículo associados.',
                },
                price: {
                    type: 'number',
                    format: 'float',
                    description: 'Preço da peça.',
                },
                quantity: {
                    type: 'integer',
                    description: 'Quantidade disponível.',
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

export { createPartsDefinitions, createPartsPath }
