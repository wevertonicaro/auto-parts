const createGroupUserPath = {
  "/group-users": {
    post: {
      tags: [
        'Grupo de usuários'
      ],
      summary: "Criar um novo grupo de usuário",
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
          description: "Objeto JSON contendo a descrição do grupo de usuário.",
          schema: {
            $ref: "#/definitions/requestCreateGroupUser"
          }
        }
      ],
      responses: {
        201: {
          description: "Grupo de usuário criado com sucesso",
          schema: {
            $ref: "#/definitions/responseCreateGroupUser"
          }
        },
        400: {
          description: "Erro ao criar o grupo de usuário",
          schema: {
            $ref: "#/definitions/errorResponse"
          }
        }
      }
    }
  }
};

const createGroupUserDefinitions = [
  {
    requestCreateGroupUser: {
      type: "object",
      required: ["description"],
      properties: {
        description: {
          type: "string",
          description: "Descrição do grupo de usuário."
        }
      }
    }
  },
  {
    responseCreateGroupUser: {
      type: "object",
      properties: {
        id: {
          type: "integer"
        },
        description: {
          type: "string"
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
  createGroupUserDefinitions,
  createGroupUserPath
};
