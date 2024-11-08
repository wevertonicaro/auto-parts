const refreshTokenLoginPath = {
  "/refresh": {
    post: {
      tags: [
        "Autenticação"
      ],
      summary: "Atualiza o token de acesso do usuário",
      consumes: [
        "application/json"
      ],
      produces: [
        "application/json"
      ],
      parameters: [
        {
          name: "Body",
          in: "body",
          description: "Objeto json contendo as propriedades de refresh token.",
          schema: {
            $ref: "#/definitions/requestPostLogin"
          }
        }
      ],
      responses: {
        200: {
          description: "Success",
          schema: {
            $ref: "#/definitions/responsePostSessao"
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

const refreshTokenLoginDefinitions = [
  {
    requestPostLogin: {
      type: "object",
      required: [
        "token"
      ],
      properties: {
        token: {
          type: "string",
          description: "Token do usuário",
        }
      },
    }
  },
  {
    responsePostSessao: {
      type: "object",
      properties: {
        status: {
          type: "boolean",
        },
        statusCode: {
          type: "integer",
          default: 200,
        },
        data: {
          type: "object",
          properties: {
            token: {
              type: "string",
            }
          },
        },
      },
    }
  }
];

export { refreshTokenLoginDefinitions, refreshTokenLoginPath };

