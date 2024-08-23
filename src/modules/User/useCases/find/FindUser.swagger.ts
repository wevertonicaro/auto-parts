const findUserPath = {
  "/users": {
    get: {
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
          required: false,
          type: "string"
        },
        {
          name: "email",
          in: "query",
          description: "Email do usuário",
          required: false,
          type: "string"
        },
        {
          $ref: "#/parameters/page"
        },
        {
          $ref: "#/parameters/limit"
        },
      ],
      responses: {
        200: {
          description: "Success",
          schema: {
            $ref: "#/definitions/responseFindUser"
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

const findUserDefinitions = [
  {
    findUserResponse: {
      type: "object",
      properties: {
        id: {
          type: "integer"
        },
        nome: {
          type: "string",
        },
        senha: {
          type: "string",
        },
        email: {
          type: "string",
        },
        ativo: {
          type: "boolean"
        },
        telefone: {
          type: "string",
        },
        groupUserId: {
          type: "integer",
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
    responseFindUser: {
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
          $ref: "#/definitions/findUserResponse"
        }
      }
    }
  }
];

export { findUserDefinitions, findUserPath };
