const deleteCarPath = {
  "/cars/:id": {
    delete: {
      tags: [
        'Veículos'
      ],
      summary: "Deletar uma veículo",
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
          description: "ID do veículo a ser deletado",
          required: true,
          type: "integer"
        }
      ],
      responses: {
        204: {
          description: "Veículo deletado com sucesso",
          schema: {
            $ref: "#/definitions/responseDeleteCar"
          }
        },
        400: {
          description: "Erro ao deletar o veículo",
          schema: {
            $ref: "#/definitions/errorResponse"
          }
        }
      }
    }
  }
};

const deleteCarDefinitions = [
  {
    responseDeleteCar: {
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
  deleteCarDefinitions,
  deleteCarPath
};

