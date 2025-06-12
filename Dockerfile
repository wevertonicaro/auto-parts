# Use a imagem base do Node.js
FROM node:alpine

# Instalar o Git
RUN apk add --no-cache git

# Defina o diretório de trabalho no contêiner
WORKDIR /usr/app/src

# Copie o package.json para o contêiner e instale as dependências
COPY package.json ./
RUN npm install

# Copie todos os arquivos do projeto para o contêiner
COPY . ./

# Copie o script wait-for-it.sh e garanta que ele tenha permissões de execução
COPY wait-for-it.sh /usr/app/wait-for-it.sh
RUN chmod +x /usr/app/wait-for-it.sh

# Exponha a porta onde a aplicação irá rodar
EXPOSE 3001

# Comando para rodar a aplicação
CMD ["npm", "start"]
