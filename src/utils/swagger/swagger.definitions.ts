const errorResponse = {
  type: 'object',
  properties: {
    status: {
      type: 'boolean',
      default: false,
    },
    statusCode: {
      type: 'integer',
      default: 400,
    },
    erros: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
        },
      },
    },
  },
};

const unauthorizedResponse = {
  type: 'object',
  properties: {
    status: {
      type: 'boolean',
      default: false,
    },
    statusCode: {
      type: 'integer',
      default: 401,
    },
    erros: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
        },
      },
    },
  },
};

const definitionsRepository: any[] = [
];

const definitions = {
  errorResponse,
  unauthorizedResponse,
};

// Merge definitions from different modules
for (let arrayObject of definitionsRepository) {
  for (let arrayDefinitions of arrayObject) {
    for (let object of arrayDefinitions) {
      for (let prop in object) {
        // @ts-ignore
        definitions[prop] = object[prop];
      }
    }
  }
}

export { definitions };