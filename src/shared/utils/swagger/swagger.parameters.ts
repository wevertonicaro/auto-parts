const parameters = {
  page: {
    name: "page",
    in: "query",
    description: "Página a ser exibida da paginação",
    required: false,
    type: "number"
  },
  limit: {
    name: "limit",
    in: "query",
    description: "Limite de registros por página na paginação",
    required: false,
    type: "number"
  },
  search: {
    name: "search",
    in: "query",
    description: "Realiza a busca não exata do valor informado. Exemplo: campo=valor",
    required: false,
    type: "string"
  },
  filters: {
    name: "filters",
    in: "query",
    description: "Realiza a busca exata dos valores informados. Devem ser separados por ponto e virgula(;). Exemplo: campo=valor;campo2=valor2. Caso queira buscar por um valor mas também trazer quando estiver nulo, basta colocar uma interrogação (?) no final do valor. Exemplo: campo=valor?. Existem as possibilidades: Negativa da instrução. Exemplo: campo=NOT(valor) ou campo=NOT('valor') para strings. Inclusiva. Exemplo: campo=IN(valor) ou campo=IN('valor') para strings. Maior e Maior ou Igual. Exemplo: campo=MORETHAN(valor) ou campo=MORETHAN('valor') para datas e campo=MORETHANOREQUAL(valor) ou campo=MORETHANOREQUAL('valor') para datas. Menor e Menor ou igual. campo=LESSTHAN(valor) ou campo=LESSTHAN('valor') para datas e campo=LESSTHANOREQUAL(valor) ou campo=LESSTHANOREQUAL('valor') para datas. Entre. Exemplo: campo=BETWEEN[valor1, valor2]",
    required: false,
    type: "string"
  },
  orderBy: {
    name: "orderBy",
    in: "query",
    description: "Realiza a ordenação de acordo com a informação passada. Exemplo: Tabela.Campo=ASC ou Tabela.Campo=DESC",
    required: false,
    type: "string"
  }
}

export {
  parameters
}
