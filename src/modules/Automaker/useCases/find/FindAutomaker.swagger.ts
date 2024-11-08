const getAutomakerPath = {
  "/automakers": {
    get: {
      tags: [
        'Montadoras'
      ],
      summary: "Obter informações sobre um ou mais montadoras.",
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
          description: "ID da montadora a ser obtido",
          required: false,
          type: "integer"
        },
        {
          name: "descricao",
          in: "query",
          description: "Descrição da montadora a ser obtida",
          required: false,
          type: "string"
        }
      ],
      responses: {
        200: {
          description: "Informações da(s) montadora(s) obtidas com sucesso",
          schema: {
            $ref: "#/definitions/responseGetAutomaker"
          }
        },
        400: {
          description: "Erro ao obter informações da(s) montadora(s)",
          schema: {
            $ref: "#/definitions/errorResponse"
          }
        }
      }
    }
  }
};

const getAutomakerDefinitions = [
  {
    responseGetAutomaker: {
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
            $ref: "#/definitions/responseCreateAutomaker"
          }
        }
      }
    }
  }
];

export {
  getAutomakerDefinitions,
  getAutomakerPath
};

