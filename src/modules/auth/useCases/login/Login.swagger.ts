const loginPath = {
  "/login": {
    post: {
      tags: [
        "Autenticação"
      ],
      summary: "Valida o login de acesso do usuário e retorna o token de acesso",
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
          description: "Objeto json contendo as propriedades de login.",
          schema: {
            $ref: "#/definitions/requestPostLogin"
          }
        }
      ],
      responses: {
        201: {
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

const loginDefinitions = [
  {
    requestPostLogin: {
      type: "object",
      required: [
        "email",
        "password"
      ],
      properties: {
        email: {
          type: "string",
          description: "Email para login do usuário",
        },
        password: {
          type: "string",
          description: "Senha do usuário",
        },
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
            },
            user: {
              type: "object",
              properties: {
                name: {
                  type: "string",
                },
                email: {
                  type: "string",
                },
              },
            },
          },
        },
      },
    }
  }
];

export { loginDefinitions, loginPath };
