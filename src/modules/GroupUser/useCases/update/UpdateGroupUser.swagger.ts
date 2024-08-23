const updateGroupUserPath = {
  "/group-users/:id": {
    put: {
      tags: [
        'Grupo de usuários'
      ],
      summary: "Atualizar informações de um grupo de usuário",
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
          description: "ID do grupo de usuário a ser atualizado",
          required: true,
          type: "integer"
        },
        {
          name: "description",
          in: "body",
          description: "Objeto JSON contendo as novas informações do grupo de usuário.",
          required: true,
          schema: {
            $ref: "#/definitions/requestUpdateGroupUser"
          }
        }
      ],
      responses: {
        200: {
          description: "Informações do grupo de usuário atualizadas com sucesso",
          schema: {
            $ref: "#/definitions/responseUpdateGroupUser"
          }
        },
        400: {
          description: "Erro ao atualizar informações do grupo de usuário",
          schema: {
            $ref: "#/definitions/errorResponse"
          }
        }
      }
    }
  }
};

const updateGroupUserDefinitions = [
  {
    requestUpdateGroupUser: {
      type: "object",
      required: ["description"],
      properties: {
        description: {
          type: "string",
          description: "Nova descrição do grupo de usuário."
        }
      }
    }
  },
  {
    responseUpdateGroupUser: {
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
          $ref: "#/definitions/responseCreateGroupUser"
        }
      }
    }
  }
];

export {
  updateGroupUserDefinitions,
  updateGroupUserPath
};
