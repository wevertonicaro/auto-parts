const deleteUserPath = {
  "/users/:id": {
    delete: {
      tags: [
        "Usuários"
      ],
      summary: "Exclui um registro de usuários",
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
          description: "Codigo do usuário a ser excluído",
          required: true,
          type: "number"
        }
      ],
      responses: {
        204: {
          description: "Success",
          schema: {
            $ref: "#/definitions/responseDeleteUser"
          }
        },
        400: {
          description: "Bad Request",
          schema: {
            $ref: "#/definitions/errorResponse"
          }
        }
      }
    }
  }
}

const deleteUserDefinitions = [
  {
    responseDeleteUser: {
      type: "object",
      properties: {
        status: {
          type: "boolean"
        },
        statusCode: {
          type: "integer",
          default: 204,
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
  deleteUserDefinitions,
  deleteUserPath
};
