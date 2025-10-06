# Imagem base do Node
FROM node:18

# Define diretório de trabalho
WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Expõe a porta do servidor (ajuste conforme seu projeto)
EXPOSE 3000

# Comando padrão para iniciar o app
CMD ["npm", "start"]
