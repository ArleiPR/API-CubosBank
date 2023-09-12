const express = require('express');
const contas = require('./controladores/contas')
const rotas = express();

rotas.get('/contas', contas.listarContas);
rotas.post('/contas', contas.criarConta); 
rotas.put('/contas/:numeroConta/usuario', contas.atualizarUsuario);
rotas.delete('/contas/:numeroConta', contas.excluirConta);
rotas.post('/transacoes/depositar', contas.depositar);
rotas.post('/transacoes/sacar', contas.sacar);
rotas.post('/transacoes/transferir', contas.transferir);
rotas.get('/contas/saldo', contas.obterSaldo);
rotas.get('/contas/extrato', contas.obterExtrato);
module.exports = rotas;