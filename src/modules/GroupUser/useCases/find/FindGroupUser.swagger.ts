const getGroupUserPath = {
  "/group-users": {
    get: {
      tags: [
        'Grupo de usuários'
      ],
      summary: "Obter informações sobre um ou mais grupos de usuários",
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
          description: "ID do grupo de usuário a ser obtido",
          required: false,
          type: "integer"
        },
        {
          name: "descricao",
          in: "query",
          description: "Descrição do grupo de usuário a ser obtida",
          required: false,
          type: "string"
        }
      ],
      responses: {
        200: {
          description: "Informações do(s) grupo(s) de usuário obtidas com sucesso",
          schema: {
            $ref: "#/definitions/responseGetGroupUser"
          }
        },
        400: {
          description: "Erro ao obter informações do(s) grupo(s) de usuário",
          schema: {
            $ref: "#/definitions/errorResponse"
          }
        }
      }
    }
  }
};

const getGroupUserDefinitions = [
  {
    responseGetGroupUser: {
      type: "object",
      properties: {
        status: {
          type: "boolean"
        },
        statusCode: {
          type: "integer",
          default: 200
        },
        data: {
          type: "array",
          items: {
            $ref: "#/definitions/responseCreateGroupUser"
          }
        }
      }
    }
  }
];

export {
  getGroupUserDefinitions,
  getGroupUserPath
};
