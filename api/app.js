// Importa o módulo Express (framework para APIs)
const express = require("express");
 
// Importa a biblioteca Faker.js (gera dados fictícios)
const { faker } = require("@faker-js/faker");
 
// Cria a instância principal do Express (nossa aplicação)
const app = express();
 
// Define a porta onde o servidor vai rodar
const port = 3000;
 
// Define o idioma para português do Brasil
faker.locale = "pt_BR";
 
app.get("/api/produtos", (req, res) => {
  // Captura o parâmetro qtd da URL
  const quantidade = parseInt(req.query.qtd);
 
  // --- O ERRO ESTAVA AQUI! ---
  // A validação agora checa se o valor não é um número (NaN) ou se é zero/negativo
  if (isNaN(quantidade) || quantidade <= 0) {
    // Retorna um erro 400 (Bad Request) com uma mensagem clara
    return res.status(400).json({
      erro: "O parâmetro 'qtd' deve ser um número inteiro positivo."
    });
  }
 
  // Cria um array vazio para armazenar os produtos
  const produtos = [];
 
  // Gera a quantidade de produtos solicitada
  for (let i = 0; i < quantidade; i++) {
    produtos.push({
      id: faker.string.uuid(),
      nome: faker.commerce.productName(),
      preco: faker.commerce.price(),
      descricao: faker.commerce.productDescription(),
    });
  }
 
  // Retorna os produtos em formato JSON
  res.json(produtos);
});
 
// Inicia o servidor na porta definida
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
 