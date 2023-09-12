
let { banco, contas, saques, depositos, transferencias } = require('../bancodedados');
let contadorConta = contas.length +1

const validarCpf = (cpf, numeroConta) => {
    const cpfSistema = contas.find((conta) => {
        return conta.numero !== Number(numeroConta) && conta.usuario.cpf === cpf;
    })

    return cpfSistema;

};
const validarEmail = (email, numeroConta) => {
    const emailSistema = contas.find((conta) => {
        return conta.numero !== Number(numeroConta) && conta.usuario.email === email;
    });

    return emailSistema;

};

const buscarContaPorNumero = (numeroConta) => {
    return contas.find((conta) => {
        return conta.numero === Number(numeroConta);
    });
};


const listarContas = (req, res) => {
    const { senha_banco } = req.query;
    if (!senha_banco) {
        return res.status(403).json({ "mensagem": "acesso negado" })
    }
    if (senha_banco === banco.senha) {
        return res.status(200).json(contas)
    }

    return res.status(401).json({ "mensagem": "A senha do banco informada é inválida!" });



};

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;
    const cpfExistente = validarCpf(cpf);
    const emailExistente = validarEmail(email);

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ "mensagem": "todos os campos são obrigatórios" });

    }

    if (cpfExistente || emailExistente) {
        return res.status(400).json({ "mensagem": "Já existe uma conta com o cpf ou e-mail informado!" })
    }

    const contaCriada = {
        numero: contadorConta,
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
    contadorConta++
    contas.push(contaCriada);
    return res.status(201).send();

};

const atualizarUsuario = (req, res) => {
    const { numeroConta } = req.params;
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body
    const emailExistente = validarEmail(email, numeroConta);
    const cpfExistente = validarCpf(cpf, numeroConta);

    if (!nome || !cpf || !data_nascimento || !telefone || !email || !senha) {
        return res.status(400).json({ "mensagem": "todos os campos são obrigatórios" });
    }

    const conta = contas.find((conta) => {
        return conta.numero === Number(numeroConta);
    });

    if (!conta) {
        return res.status(404).json({ "mensagem": "usuário não encontrado!" })
    }

    if (emailExistente) {
        return res.status(400).json({ "mensagem": "Outra conta já possui esse email!" });
    }

    if (cpfExistente) {
        return res.status(400).json({ "mensagem": "Outra conta já possui esse CPF!" });
    }

    conta.usuario.nome = nome;
    conta.usuario.cpf = cpf;
    conta.usuario.data_nascimento = data_nascimento;
    conta.usuario.telefone = telefone;
    conta.usuario.email = email;
    conta.usuario.senha = senha;

    return res.status(204).send()
};

const excluirConta = (req, res) => {
    const { numeroConta } = req.params

    const conta = buscarContaPorNumero(numeroConta);

    if (!conta) {
        return res.status(404).json({ "mensagem": "usuário não encontrado" });
    }

    if (conta.saldo) {
        return res.status(400).json({ "mensagem": "A conta só pode ser removida se o saldo for zero!" })
    }

    contas = contas.filter((conta) => {
        return conta.numero !== Number(numeroConta);
    });


    return res.status(204).send(contas);
};

const depositar = (req, res) => {
    const { numero_conta, valor } = req.body

    if (!numero_conta || !valor) {
        return res.status(400).json({ "mensagem": "O número da conta e o valor são obrigatórios!" })
    }
    const conta = buscarContaPorNumero(numero_conta);

    if (!conta) {
        return res.status(404).json({ "mensagem": "conta não encontrada" });
    }

    if (valor <= 0) {
        return res.status(400).json({ "mensagem": "O valor do depósito deve ser maior que zero." });
    }

    const registroDeposito = {
        data: new Date().toISOString(),
        numero_conta,
        valor,
    };

    depositos.push(registroDeposito);


    conta.saldo += valor;

    return res.status(204).send();
};

const sacar = (req, res) => {
    const { numero_conta, valor, senha } = req.body

    if (!numero_conta || !valor || !senha) {
        return res.status(400).json({ "mensagem": "O número da conta, o valor e a senha são obrigatórios!" })
    }

    const conta = buscarContaPorNumero(numero_conta);

    if (!conta) {
        return res.status(404).json({ "mensagem": "conta não encontrada" });
    }

    if (conta.usuario.senha !== senha) {
        return res.status(401).json({ "mensagem": "Senha inválida." });
    }

    if (valor <= 0) {
        return res.status(400).json({ "mensagem": "O valor do saque deve ser maior que zero." });
    }

    if (conta.saldo < valor) {
        return res.status(403).json({ "mensagem": "Saldo insuficiente para realizar o saque." });
    }

    const registroSaque = {
        data: new Date().toISOString(),
        numero_conta,
        valor,
    };

    saques.push(registroSaque);


    conta.saldo -= valor;

    return res.status(204).send();
};

const transferir = (req, res) => {
    const { numero_conta_origem, numero_conta_destino, valor, senha } = req.body;

    if (!numero_conta_origem || !numero_conta_destino || !valor || !senha) {
        return res.status(400).json({ "mensagem": "Número da conta de origem, número da conta de destino, valor e senha são obrigatórios." });
    };
    
    if (valor <= 0) {
        return res.status(400).json({ "mensagem": "O valor da transferência deve ser maior que zero." });
    }
    const contaOrigem = buscarContaPorNumero(numero_conta_origem)


    if (!contaOrigem) {
        return res.status(404).json({ "mensagem": "Conta de origem não encontrada." });
    }

    const contaDestino = buscarContaPorNumero(numero_conta_destino);

    if (!contaDestino) {
        return res.status(404).json({ "mensagem": "Conta de destino não encontrada." });
    }

    if (contaOrigem.usuario.senha !== senha) {
        return res.status(401).json({ "mensagem": "Senha da conta de origem inválida." });
    }

    if (contaOrigem.saldo < valor) {
        return res.status(403).json({ "mensagem": "Saldo insuficiente para realizar a transferência." });
    }

    contaOrigem.saldo -= valor;
    contaDestino.saldo += valor;

    const registroTransferencia = {
        data: new Date().toISOString(),
        numero_conta_origem: numero_conta_origem,
        numero_conta_destino: numero_conta_destino,
        valor: valor
    };

    transferencias.push(registroTransferencia);

    res.status(204).send();
};

const obterSaldo = (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        return res.status(400).json({ "mensagem": "Número da conta e senha são obrigatórios." });
    }

    const conta = buscarContaPorNumero(numero_conta);

    if (!conta) {
        return res.status(404).json({ "mensagem": "Conta bancária não encontrada!" });
    }

    if (conta.usuario.senha !== senha) {
        return res.status(401).json({ "mensagem": "Senha inválida." });
    }

    res.status(200).json({ "saldo": conta.saldo });
};

const obterExtrato = (req, res) => {
    const { numero_conta, senha } = req.query;

    if (!numero_conta || !senha) {
        return res.status(400).json({ "mensagem": "Número da conta e senha são obrigatórios." });
    }

    const conta = buscarContaPorNumero(numero_conta);

    if (!conta) {
        return res.status(404).json({ "mensagem": "Conta bancária não encontrada." });
    }

    if (conta.usuario.senha !== senha) {
        return res.status(401).json({ "mensagem": "Senha inválida." });
    }

    const extrato = {
        depositos: depositos.filter((d) => d.numero_conta === numero_conta),
        saques: saques.filter((s) => s.numero_conta === numero_conta),
        transferenciasEnviadas: transferencias.filter((t) => t.numero_conta_origem === numero_conta),
        transferenciasRecebidas: transferencias.filter((t) => t.numero_conta_destino === numero_conta),
    };

    return res.status(200).json(extrato);
};



module.exports = {
    listarContas,
    criarConta,
    atualizarUsuario,
    excluirConta,
    depositar,
    sacar,
    transferir,
    obterSaldo,
    obterExtrato
}