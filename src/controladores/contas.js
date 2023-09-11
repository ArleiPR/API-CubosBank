
const { banco, contas, saques, depositos, transferencias } = require('../bancodedados');

const validarCpf = (cpf) => {
    const cpfSistema = contas.find((conta) =>{
        return conta.usuario.cpf === cpf;
    })

    return cpfSistema;
    
}
const validarEmail = (email) => {
    const emailSistema = contas.find((conta) =>{
        return conta.usuario.email === email;
    })

    return emailSistema;
    
}


const listarContas = (req, res) => {
    const { senha_banco } = req.query;
    if (senha_banco === banco.senha) {
        return res.status(200).json(contas)
    }

    return res.status(401).json({"mensagem": "A senha do banco informada é inválida!"});
    


};

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha} = req.body;
    
    if(!nome || !cpf || !data_nascimento || !telefone || !email || !senha ) {
       return res.status(400).json({"mensagem": "todos os campos são obrigatórios"});
    
    }
    const cpfExistente = validarCpf(cpf);
    const emailExistente = validarEmail(email);

    if (cpfExistente || emailExistente) {
        return res.status(400).json({"mensagem": "Já existe uma conta com o cpf ou e-mail informado!"})
    }
    const contaCriada = {
        numero: contas.length + 1,
        saldo: 0,
        usuario: {
            nome, 
            cpf,
            data_nascimento, 
            telefone,
            email,
            senha,
        }
        
    }
    contas.push(contaCriada);
    res.status(201).send()
    
}

module.exports = {
    listarContas,
    criarConta
}