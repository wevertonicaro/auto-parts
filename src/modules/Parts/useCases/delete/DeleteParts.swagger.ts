const deletePartsPath = {
    '/parts/:id': {
        delete: {
            tags: ['Peças'],
            summary: 'Deletar uma peça',
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
                    description: 'ID da peça a ser deletada',
                    required: true,
                    type: 'integer',
                },
            ],
            responses: {
                204: {
                    description: 'Peça deletada com sucesso',
                    schema: {
                        $ref: '#/definitions/responseDeleteParts',
                    },
                },
                400: {
                    description: 'Erro ao deletar a peça',
                    schema: {
                        $ref: '#/definitions/errorResponse',
                    },
                },
            },
        },
    },
}

const deletePartsDefinitions = [
    {
        responseDeleteParts: {
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
    },
]

export { deletePartsDefinitions, deletePartsPath }
