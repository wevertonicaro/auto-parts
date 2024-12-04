const getCarPath = {
  "/cars": {
    get: {
      tags: [
        'Veículos'
      ],
      summary: "Obter informações sobre um ou mais veículos.",
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
          description: "ID do veículo a ser obtido",
          required: false,
          type: "integer"
        },
        {
          name: "description",
          in: "query",
          description: "nome do veículo.",
          required: false,
          type: "string"
        },
        {
          name: "automakerId",
          in: "query",
          description: "Código da montadora",
          required: false,
          type: "number"
        }
      ],
      responses: {
        200: {
          description: "Informações do(s) veículo(s) obtidas com sucesso",
          schema: {
            $ref: "#/definitions/responseGetCar"
          }
        },
        400: {
          description: "Erro ao obter informações do(s) veículo(s)",
          schema: {
            $ref: "#/definitions/errorResponse"
          }
        }
      }
    }
  }
};

const getCarDefinitions = [
  {
    responseGetCar: {
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
            $ref: "#/definitions/responseCreateCar"
          }
        }
      }
    }
  }
];

export {
  getCarDefinitions,
  getCarPath
};

