const createUserPath = {
    '/users': {
        post: {
            tags: ['Usuários'],
            summary: 'Criar perfil de usuários',
            consumes: ['application/json'],
            produces: ['application/json'],
            parameters: [
                {
                    name: 'Body',
                    in: 'body',
                    description: 'Objeto json contendo as propriedades do usuário.',
                    schema: {
                        $ref: '#/definitions/requestPostUser',
                    },
                },
            ],
            responses: {
                201: {
                    description: 'Success',
                    schema: {
                        $ref: '#/definitions/responsePostUser',
                    },
                },
                400: {
                    description: 'Bad Request',
                    schema: {
                        $ref: '#/definitions/errorResponse',
                    },
                },
            },
        },
    },
}

const createUserDefinitions = [
    {
        requestPostUser: {
            type: 'object',
            required: ['nome', 'senha', 'email', 'telefone'],
            properties: {
                nome: {
                    type: 'string',
                    description: 'Nome do usuário',
                },
                senha: {
                    type: 'string',
                    description: 'Senha do usuário',
                },
                email: {
                    type: 'string',
                    description: 'Email do usuário',
                },
                ativo: {
                    type: 'boolean',
                },
                telefone: {
                    type: 'string',
                    description: 'Telefone do usuário',
                },
                groupUserId: {
                    type: 'integer',
                    description: 'Código do grupo de usuários',
                },
            },
        },
    },
    {
        createUserResponse: {
            type: 'object',
            properties: {
                id: {
                    type: 'integer',
                },
                nome: {
                    type: 'string',
                },
                senha: {
                    type: 'string',
                },
                email: {
                    type: 'string',
                },
                ativo: {
                    type: 'boolean',
                },
                telefone: {
                    type: 'string',
                },
                groupUserId: {
                    type: 'integer',
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
    {
        responsePostUser: {
            type: 'object',
            properties: {
                status: {
                    type: 'boolean',
                },
                statusCode: {
                    type: 'integer',
                    default: 201,
                },
                data: {
                    $ref: '#/definitions/createUserResponse',
                },
            },
        },
    },
]

export { createUserDefinitions, createUserPath }
