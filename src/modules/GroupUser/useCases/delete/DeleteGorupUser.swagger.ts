const deleteGroupUserPath = {
  "/group-users/:id": {
    delete: {
      tags: [
        'Grupo de usuários'
      ],
      summary: "Deletar um grupo de usuário",
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
          description: "ID do grupo de usuário a ser deletado",
          required: true,
          type: "integer"
        }
      ],
      responses: {
        204: {
          description: "Grupo de usuário deletado com sucesso",
          schema: {
            $ref: "#/definitions/responseDeleteGroupUser"
          }
        },
        400: {
          description: "Erro ao deletar o grupo de usuário",
          schema: {
            $ref: "#/definitions/errorResponse"
          }
        }
      }
    }
  }
};

const deleteGroupUserDefinitions = [
  {
    responseDeleteGroupUser: {
      type: "object",
      properties: {
        status: {
          type: "boolean"
        },
        statusCode: {
          type: "integer",
          default: 204
        },
        data: {
          type: "object",
          properties: {}
        }
      }
    }
  }
];

export {
  deleteGroupUserDefinitions,
  deleteGroupUserPath
};
