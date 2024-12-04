const updateCarPath = {
  "/cars/:id": {
    put: {
      tags: [
        'Veículos'
      ],
      summary: "Atualizar informações de um veículo.",
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
          description: "ID do veículo a ser atualizado",
          required: true,
          type: "integer"
        },
        {
          name: "description",
          in: "body",
          description: "Objeto JSON contendo as novas informações do veículo.",
          required: true,
          schema: {
            $ref: "#/definitions/requestUpdateCar"
          }
        }
      ],
      responses: {
        200: {
          description: "Informações do veículo atualizadas com sucesso",
          schema: {
            $ref: "#/definitions/responseUpdateCar"
          }
        },
        400: {
          description: "Erro ao atualizar informações do veículo",
          schema: {
            $ref: "#/definitions/errorResponse"
          }
        }
      }
    }
  }
};

const updateCarDefinitions = [
  {
    requestUpdateCar: {
      type: "object",
      required: ["description"],
      properties: {
        description: {
          type: "string",
          description: "Novo nome do veículo."
        }, 
        automakerId: {
          type: "number",
          description: "Código da montadora."
        }
      }
    }
  },
  {
    responseUpdateCar: {
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
          $ref: "#/definitions/responseCreateCar"
        }
      }
    }
  }
];

export {
  updateCarDefinitions,
  updateCarPath
};

