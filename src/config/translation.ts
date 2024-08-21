export default {
  mixed: {
    required: 'O campo ${path} é obrigatório',
    oneOf: 'O campo ${path} deve possuir um dos seguintes valores: ${values}',
    notType: ({
      type, value, originalValue, path
    }: any) => {
      const isCast = originalValue != null && originalValue !== value;
      if (type == 'number')
        type = 'número'
      let msg = `${`O campo ${path} deve ser do tipo '${type}', `
        + `o valor informado foi: '${originalValue}'`}`;

      if (value === null) {
        msg += '\nSe a intenção era usar "null" como um valor em branco marque o esquema como `.nullable()`.';
      }

      return msg;
    }
  },
  string: {
    email: 'Preencha um email válido no campo ${path}',
    min: 'O tamanho mínimo para o campo ${path} é ${min}',
    max: 'O tamanho máximo para o campo ${path} é ${max}',
    url: 'Informe uma url válida no campo ${path}',
    required: 'O campo ${path} é obrigatório'
  },
  number: {
    min: 'O valor mínimo para o campo ${path} é ${min}',
    max: 'O valor máximo para o campo ${path} é ${max}'
  }
}