const deleteAutomakerPath = {
  "/automakers/:id": {
    delete: {
      tags: [
        'Montadoras'
      ],
      summary: "Deletar uma montadora",
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
          description: "ID da montadora a ser deletado",
          required: true,
          type: "integer"
        }
      ],
      responses: {
        204: {
          description: "Grupo de usuário deletado com sucesso",
          schema: {
            $ref: "#/definitions/responseDeleteAutomaker"
          }
        },
        400: {
          description: "Erro ao deletar a montadora",
          schema: {
            $ref: "#/definitions/errorResponse"
          }
        }
      }
    }
  }
};

const deleteAutomakerDefinitions = [
  {
    responseDeleteAutomaker: {
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
  deleteAutomakerDefinitions,
  deleteAutomakerPath
};

