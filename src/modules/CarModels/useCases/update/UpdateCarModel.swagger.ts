const updateCarModelPath = {
    '/car-models/:id': {
        put: {
            tags: ['Modelos de Veículos'],
            summary: 'Atualizar informações de um modelo de veículo.',
            consumes: ['application/json'],
            produces: ['application/json'],
            security: [
                {
                    Bearer: [],
                },
            ],
            parameters: [
                {
                    name: 'id',
                    in: 'query',
                    description: 'ID do modelo do veículo a ser atualizado',
                    required: true,
                    type: 'integer',
                },
                {
                    name: 'description',
                    in: 'body',
                    description: 'Objeto JSON contendo as novas informações do veículo.',
                    required: true,
                    schema: {
                        $ref: '#/definitions/requestUpdateCarModel',
                    },
                },
            ],
            responses: {
                200: {
                    description: 'Informações do modelo do veículo atualizadas com sucesso',
                    schema: {
                        $ref: '#/definitions/responseUpdateCarModel',
                    },
                },
                400: {
                    description: 'Erro ao atualizar informações do modelo do veículo',
                    schema: {
                        $ref: '#/definitions/errorResponse',
                    },
                },
            },
        },
    },
}

const updateCarModelDefinitions = [
    {
        requestUpdateCarModel: {
            type: 'object',
            required: ['description'],
            properties: {
                description: {
                    type: 'string',
                    description: 'Novo nome do modelo do veículo.',
                },
                carId: {
                    type: 'number',
                    description: 'Código do veículo.',
                },
            },
        },
    },
    {
        responseUpdateCarModel: {
            type: 'object',
            properties: {
                status: {
                    type: 'boolean',
                },
                statusCode: {
                    type: 'integer',
                    default: 200,
                },
                data: {
                    $ref: '#/definitions/responseCreateCar',
                },
            },
        },
    },
]

export { updateCarModelDefinitions, updateCarModelPath }
