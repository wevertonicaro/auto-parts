const importCarPath = {
    '/cars/import': {
        post: {
            tags: ['Veículos'],
            summary: 'Importar lista de carros via arquivo CSV',
            description:
                'Endpoint para upload de um arquivo CSV contendo uma lista de carros. Apenas registros únicos serão adicionados ao sistema.',
            consumes: ['multipart/form-data'],
            produces: ['application/json'],
            security: [
                {
                    Bearer: [],
                },
            ],
            parameters: [
                {
                    name: 'file',
                    in: 'formData',
                    required: true,
                    description: 'Arquivo CSV contendo a lista de carros com descrição e marca.',
                    type: 'file',
                },
            ],
            responses: {
                200: {
                    description: 'Importação realizada com sucesso',
                    schema: {
                        $ref: '#/definitions/responseImportCar',
                    },
                },
                400: {
                    description: 'Erro no arquivo enviado ou estrutura inválida',
                    schema: {
                        $ref: '#/definitions/errorResponse',
                    },
                },
            },
        },
    },
}

const importCarDefinitions = [
    {
        responseImportCar: {
            type: 'object',
            properties: {
                totalRecords: {
                    type: 'integer',
                    description: 'Número total de registros processados do arquivo.',
                },
                importedRecords: {
                    type: 'array',
                    description: 'Lista de registros importados com sucesso.',
                    items: {
                        type: 'object',
                        properties: {
                            id: {
                                type: 'integer',
                                description: 'Identificador único da montadora.',
                            },
                            description: {
                                type: 'string',
                                description: 'Descrição da montadora.',
                            },
                            automakerId: {
                                type: 'integer',
                                description: 'Código referente a montadora do veículo.',
                            },
                            createdAt: {
                                type: 'string',
                                format: 'date-time',
                                description: 'Data e hora de criação do registro.',
                            },
                            updatedAt: {
                                type: 'string',
                                format: 'date-time',
                                description: 'Data e hora da última atualização do registro.',
                            },
                        },
                    },
                },
                duplicateRecords: {
                    type: 'integer',
                    description: 'Número de registros que já existiam no sistema.',
                },
                errorRecords: {
                    type: 'integer',
                    description:
                        'Número de registros que obtiveram error ao serem gravados no sistema.',
                },
            },
        },
    },
    {
        errorResponse: {
            type: 'object',
            properties: {
                message: {
                    type: 'string',
                    description: 'Descrição do erro ocorrido.',
                },
                statusCode: {
                    type: 'integer',
                    description: 'Código HTTP do erro.',
                },
            },
        },
    },
]

export { importCarDefinitions, importCarPath }
