const getCarModelPath = {
    '/car-models': {
        get: {
            tags: ['Modelos de Veículos'],
            summary: 'Obter informações sobre um ou mais modelos de veículos.',
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
                    description: 'ID do modelo do veículo a ser obtido',
                    required: false,
                    type: 'integer',
                },
                {
                    name: 'description',
                    in: 'query',
                    description: 'nome do modelo do veículo.',
                    required: false,
                    type: 'string',
                },
                {
                    name: 'carId',
                    in: 'query',
                    description: 'Código do veículo',
                    required: false,
                    type: 'number',
                },
            ],
            responses: {
                200: {
                    description: 'Informações do(s) modelo(s) do(s) veículo(s) obtidas com sucesso',
                    schema: {
                        $ref: '#/definitions/responseGetCarModel',
                    },
                },
                400: {
                    description: 'Erro ao obter informações do(s) veículo(s)',
                    schema: {
                        $ref: '#/definitions/errorResponse',
                    },
                },
            },
        },
    },
}

const getCarModelDefinitions = [
    {
        responseGetCarModel: {
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
                    type: 'array',
                    items: {
                        $ref: '#/definitions/responseCreateCarModel',
                    },
                },
            },
        },
    },
]

export { getCarModelDefinitions, getCarModelPath }
