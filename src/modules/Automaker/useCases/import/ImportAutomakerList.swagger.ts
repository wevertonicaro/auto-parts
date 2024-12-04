const importAutomakerPath = {
  "/automakers/import": {
    post: {
      tags: [
        "Montadoras"
      ],
      summary: "Importar marcas de montadoras via arquivo CSV",
      description: "Endpoint para upload de um arquivo CSV contendo marcas de montadoras. Apenas registros únicos serão adicionados ao sistema.",
      consumes: [
        "multipart/form-data"
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
          name: "file",
          in: "formData",
          required: true,
          description: "Arquivo CSV contendo as marcas das montadoras.",
          type: "file"
        }
      ],
      responses: {
        200: {
          description: "Importação realizada com sucesso",
          schema: {
            $ref: "#/definitions/responseImportAutomaker"
          }
        },
        400: {
          description: "Erro no arquivo enviado ou estrutura inválida",
          schema: {
            $ref: "#/definitions/errorResponse"
          }
        }
      }
    }
  }
};

const importAutomakerDefinitions = [
  {
    responseImportAutomaker: {
      type: "object",
      properties: {
        totalRecords: {
          type: "integer",
          description: "Número total de registros processados do arquivo."
        },
        importedRecords: {
          type: "integer",
          description: "Número de registros que foram importados com sucesso."
        },
        duplicateRecords: {
          type: "integer",
          description: "Número de registros que já existiam no sistema."
        }
      }
    }
  },
  {
    errorResponse: {
      type: "object",
      properties: {
        message: {
          type: "string",
          description: "Descrição do erro ocorrido."
        },
        statusCode: {
          type: "integer",
          description: "Código HTTP do erro."
        }
      }
    }
  }
];

export {
  importAutomakerDefinitions, importAutomakerPath
};

