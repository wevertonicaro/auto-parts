const createCarModelPath = {
    '/car-models': {
        post: {
            tags: ['Modelos de Veículos'],
            summary: 'Criar um novo modelo de veículo',
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
                    description: 'Objeto JSON contendo a descrição do modelo do veículo.',
                    schema: {
                        $ref: '#/definitions/requestCreateCarModel',
                    },
                },
            ],
            responses: {
                201: {
                    description: 'Modelo de veículo criado com sucesso',
                    schema: {
                        $ref: '#/definitions/responseCreateCarModel',
                    },
                },
                400: {
                    description: 'Erro ao criar o modelo do veículo',
                    schema: {
                        $ref: '#/definitions/errorResponse',
                    },
                },
            },
        },
    },
}

const createCarModelDefinitions = [
    {
        requestCreateCarModel: {
            type: 'object',
            required: ['description', 'carId'],
            properties: {
                description: {
                    type: 'string',
                    description: 'Descrição do modelo do veículo.',
                },
                carId: {
                    type: 'integer',
                    description: 'Id do veículo.',
                },
            },
        },
    },
    {
        responseCreateCarModel: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                },
                description: {
                    type: 'string',
                },
                carId: {
                    type: 'integer',
                },
                createdAt: {
                    type: 'string',
                },
                updatedAt: {
                    type: 'string',
                },
            },
        },
    },
]

export { createCarModelDefinitions, createCarModelPath }
