const deleteCarModelPath = {
    '/car-models/:id': {
        delete: {
            tags: ['Modelos de Veículos'],
            summary: 'Deletar um modelo de veículo',
            description: 'Deleta um modelo de veículo com base no ID fornecido.',
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
                    required: true,
                    description: 'ID do modelo de veículo a ser deletado.',
                    type: 'integer',
                },
            ],
            responses: {
                204: {
                    description: 'Modelo do veículo deletado com sucesso',
                    schema: {
                        $ref: '#/definitions/responseDeleteCarModel',
                    },
                },
                400: {
                    description: 'Erro ao deletar o modelo do veículo.',
                    schema: {
                        $ref: '#/definitions/errorResponse',
                    },
                },
            },
        },
    },
}

const deleteCarModelDefinitions = {
    responseDeleteCarModel: {
        type: 'object',
        properties: {
            status: {
                type: 'boolean',
            },
            statusCode: {
                type: 'integer',
                default: 204,
            },
            data: {
                type: 'object',
                properties: {},
            },
        },
    },
}

export { deleteCarModelDefinitions, deleteCarModelPath }
