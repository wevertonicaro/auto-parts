const createCarPath = {
  "/cars": {
    post: {
      tags: [
        'Veículos'
      ],
      summary: "Criar um novo veículo",
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
          name: "body",
          in: "body",
          description: "Objeto JSON contendo a descrição do veículo.",
          schema: {
            $ref: "#/definitions/requestCreateCar"
          }
        }
      ],
      responses: {
        201: {
          description: "Veículo criado com sucesso",
          schema: {
            $ref: "#/definitions/responseCreateCar"
          }
        },
        400: {
          description: "Erro ao criar o veículo.",
          schema: {
            $ref: "#/definitions/errorResponse"
          }
        }
      }
    }
  }
};

const createCarDefinitions = [
  {
    requestCreateCar: {
      type: "object",
      required: ["description", "automakerId"],
      properties: {
        description: {
          type: "string",
          description: "Nome do Veículo."
        },
        automakerId: {
          type: "number",
          description: "Código da montadora.",
        },
      }
    }
  },
  {
    responseCreateCar: {
      type: "object",
      properties: {
        id: {
          type: "integer"
        },
        description: {
          type: "string"
        },
        automakerId: {
          type: "number"
        },
        createdAt: {
          type: "string"
        },
        updatedAt: {
          type: "string"
        }
      }
    }
  }
];

export {
  createCarDefinitions,
  createCarPath
};

