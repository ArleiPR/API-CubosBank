const bancoDeDados = require('../bancodedados');
const { banco } = require('../bancodedados');



const listarContas = (req, res) => {
    const { senha_banco } = req.query;
    if (senha_banco === banco.senha) {
        return res.status(200).json(bancoDeDados.contas)
    }

    return res.status(401).json({"mensagem": "A senha do banco informada é inválida!"});
    


};

//const criarConta = (req, res) => {

//}

module.exports = {
    listarContas

}