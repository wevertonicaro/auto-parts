import { createPartsDefinitions, createPartsPath } from '../useCases/create/CreateParts.swagger'

const tagsParts = {
    name: 'Peças',
    description: 'Processos a respeito de criação, busca, atualização e exclusão de peças.',
}

const pathParts: Array<Object> = [createPartsPath]

const definitionsParts: Array<Object> = [createPartsDefinitions]

export { definitionsParts, pathParts, tagsParts }
