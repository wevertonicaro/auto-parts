const putUserPath = {
  "/users/:id": {
    put: {
      tags: [
        "Usuários"
      ],
      summary: "Buscar perfil de usuários",
      consumes: [
        "application/json"
      ],
      produces: [
        "application/json"
      ],
      security: [
        {
          Bearer: []
        }
      ],
      parameters: [
        {
          name: "id",
          in: "query",
          description: "Codigo do usuário",
          required: true,
          type: "string"
        },
        {
          name: "Body",
          in: "body",
          description: "Objeto json contendo as propriedades do usuário.",
          schema: {
            $ref: "#/definitions/requestPutUser"
          }
        }
      ],
      responses: {
        200: {
          description: "Success",
          schema: {
            $ref: "#/definitions/responsePutUser"
          }
        },
        400: {
          description: "Bad Request",
          schema: {
            $ref: "#/definitions/errorResponse"
          }
        }
      }
    },
  },
};

const putUserDefinitions = [
  {
    requestPutUser: {
      type: "object",
      properties: {
        nome: {
          type: "string",
          description: "Nome do usuário",
        },
        senha: {
          type: "string",
          description: "Senha do usuário",
        },
        email: {
          type: "string",
          description: "Email do usuário"
        },
        ativo: {
          type: "boolean"
        },
        telefone: {
          type: "string",
          description: "Telefone do usuário"
        }
      },
    }
  },
  {
    putUserResponse: {
      type: "object",
      properties: {
        id: {
          type: "integer"
        },
        name: {
          type: "string",
        },
        password: {
          type: "string",
        },
        email: {
          type: "string",
        },
        active: {
          type: "boolean"
        },
        phone: {
          type: "string",
        },
        groupUserId: {
          type: "number"
        },
        createdAt: {
          type: "string"
        },
        updatedAt: {
          type: "string"
        }
      }
    }
  },
  {
    responsePutUser: {
      type: "object",
      properties: {
        status: {
          type: "boolean"
        },
        statusCode: {
          type: "integer",
          default: 200,
        },
        data: {
          $ref: "#/definitions/putUserResponse"
        }
      }
    }
  }
];

export { putUserDefinitions, putUserPath };
