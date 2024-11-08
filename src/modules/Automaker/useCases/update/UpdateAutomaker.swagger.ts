const updateAutomakerPath = {
  "/automakers/:id": {
    put: {
      tags: [
        'Montadoras'
      ],
      summary: "Atualizar informações de uma montadora.",
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
          description: "ID da montadora a ser atualizado",
          required: true,
          type: "integer"
        },
        {
          name: "description",
          in: "body",
          description: "Objeto JSON contendo as novas informações da montadora.",
          required: true,
          schema: {
            $ref: "#/definitions/requestUpdateAutomaker"
          }
        }
      ],
      responses: {
        200: {
          description: "Informações da montadora atualizadas com sucesso",
          schema: {
            $ref: "#/definitions/responseUpdateAutomaker"
          }
        },
        400: {
          description: "Erro ao atualizar informações da montadora",
          schema: {
            $ref: "#/definitions/errorResponse"
          }
        }
      }
    }
  }
};

const updateAutomakerDefinitions = [
  {
    requestUpdateAutomaker: {
      type: "object",
      required: ["description"],
      properties: {
        description: {
          type: "string",
          description: "Novo nome da montadora."
        }
      }
    }
  },
  {
    responseUpdateAutomaker: {
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
          $ref: "#/definitions/responseCreateAutomaker"
        }
      }
    }
  }
];

export {
  updateAutomakerDefinitions,
  updateAutomakerPath
};

