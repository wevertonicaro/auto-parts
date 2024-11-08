import { definitionsAuth } from "modules/auth/swagger/Auth.swagger";
import { definitionsAutomaker } from "modules/Automaker/swagger/Automaker.swagger";
import { definitionsGroupUser } from "modules/GroupUser/swagger/GroupUser.swagger";
import { definitionsUser } from "modules/User/swagger/User.swagger";

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
  definitionsUser,
  definitionsGroupUser,
  definitionsAuth,
  definitionsAutomaker,
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

