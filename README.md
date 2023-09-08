# Configurações

O frontend e o servidor da aplicação estão divididos em dois diretórios, frontend e server respectivamente. É necessário acessar cada uma das pastas em um terminal 
para configurar e inicializar cada um.

# 📁server
Acesse a pasta servidor no terminal e execute o comando "npm i" para instalar todas as dependências do projeto. Depois que a instalação for concluída, localize o arquivo 
".env.example" e renomeie ele para apenas ".env". Após renomear, acesse o arquivo .env e preencha as variáveis.

Guia:<br />
MYSQL_HOST= Host do MYSQL local (ex: localhost)<br />
MYSQL_USER= Nome do usuário do MYSQL (ex: root)<br />
MYSQL_PASSWORD= Senha do usuário do MYSQL<br />
MYSQL_DATABASE= Nome do banco de dados onde se encontram as tabelas criadas para o teste<br />
PORT= Porta em que o server vai rodar (ex: 3001)<br />

Após o preenchimento das variáveis de ambiente, é necessário executar o comando "npm run build" no terminal para converter o código typescript para javascript. Depois
executar o comando "npm start" ou "npm run start" para inicializar o server.

# 📁frontend
Ao abrir a pasta frontend no terminal, é necessário executar o comando "npm i" para instalar todas as dependências do projeto. Assim que a instalação for concluída, 
localize o arquivo ".env.example" e renomeie ele para apenas ".env". Depois de renomear, acesse o arquivo .env e preencha a variável "REACT_APP_SERVER" com a url e a porta
configurada no servidor.
Exemplo: REACT_APP_SERVER='http://localhost:3001/'
