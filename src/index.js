const express = require('express');
const app = express();
const rotas = require('./rotas');
const { listarContas } = require('./controladores/contas');

app.use(express.json());

app.use(rotas);

app.listen(3000);
console.log('servidor ativo')
