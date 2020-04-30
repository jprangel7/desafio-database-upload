# Desafio-Database-Upload
Desafio proposto durante o BootCamp GoStack 11, para testar o conhecimento adquirido sobre NodeJS junto ao TypeScript, incluindo 
o uso de banco de dados Docker/Postgres com o TypeORM e envio de arquivos com o Multer.
O desafio consiste em armazenar transações financeiras de entrada e saída e permitir o cadastro e a listagem dessas transações, 
além de permitir a criação de novos registros no banco de dados a partir do envio de um arquivo csv. 

## Iniciando a Aplicação
Primeiramente, faça um clone do repositório 
`git clone https://github.com/jprangel7/desafio-database-upload.git`

Agora, acesse o diretóriodo projeto e instale as dependências, com Yarn: 
`yarn add`
ou NPM:
`npm install`

Após a instalação, use o comando `yarn dev:server` ou `npm dev:server` para iniciar a plicação localmente.  

## Rotas
`POST /transactions`: A rota recebe `title`, `value`, `type` e `category` dentro do corpo da requisição, sendo o `type` o tipo da 
transação, que é `income` para entradas (depósitos) e `outcome` para saídas (retiradas). Ao cadastrar uma nova transação, 
ela é armazenada dentro do banco de dados, possuindo os campos `id`, `title`, `value`, `type`, `category_id`, `created_at` e `updated_at`.

`GET /transactions`: Essa rota retorna uma listagem com todas as transações cadastradas até agora, junto com o valor da soma
de entradas, retiradas e total de crédito.

`DELETE /transactions/:id`: A rota delete a transação com o `id` presente no parâmetro da rota.

`POST /transactions/import`: A rota permite a importação de um arquivo com formato `.csv` contendo as mesmas informações 
necessárias para criação de uma transação, onde cada linha do arquivo CSV é novo registro para o banco de dados, 
e por fim retorna todas as transactions que foram importadas para o banco de dados.




