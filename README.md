# API CubosBank 🏦

A API CubosBank é uma API REST que oferece funcionalidades de gerenciamento de contas bancárias. Ela permite criar contas, listar contas, consultar saldo, obter extratos, sacar dinheiro, realizar transferências e excluir contas.

## Visão Geral 👀

O objetivo da API CubosBank é simplificar o gerenciamento financeiro, permitindo que os desenvolvedores integrem facilmente recursos bancários em seus aplicativos. Com esta API, você pode realizar as seguintes operações:

- Criar contas bancárias
- Listar contas bancárias
- Consultar saldo de contas
- Obter extratos de conta
- Sacar dinheiro de contas
- Realizar transferências entre contas
- Excluir contas bancárias

## Pré-requisitos 📋

Para começar a usar a API CubosBank, você precisa ter:

- [Node.js](https://nodejs.org/) instalado
- [Git](https://git-scm.com/) instalado
- Um editor de texto de sua escolha
- Um ambiente de desenvolvimento configurado

## Instalação 🚀

Para instalar a API CubosBank, siga os seguintes passos:

1. Clone este repositório:

   ```shell
   git clone https://github.com/arleiPR/api-cubosbank.git
   cd api-cubosbank
   ```

2. Instale as dependências:

   ```shell
   npm install
   ```

3. Inicie o servidor:

   ```shell
   npm run dev
   ```

Agora, você pode usar o comando `npm run dev` para iniciar o servidor da API CubosBank.

## Uso 🧑‍💻

Para usar a API CubosBank, consulte a documentação da API para obter detalhes sobre os endpoints disponíveis e como usá-los.

### Criar Contas Bancárias

Para criar uma conta bancária, você pode usar o endpoint POST /contas com os dados necessários.

### Consultar Saldo

Para consultar o saldo de uma conta bancária, utilize o endpoint GET /contas/:id/saldo, onde :id é o identificador da conta.

### Sacar Dinheiro

Para sacar dinheiro de uma conta bancária, utilize o endpoint POST /contas/:id/sacar com o valor desejado.

## Contribuição 🤝

Contribuições para melhorar a API CubosBank são bem-vindas! Para contribuir, siga estas etapas:

1. Faça um fork deste repositório.
2. Crie uma branch com sua contribuição: `git checkout -b minha-contribuicao`.
3. Faça suas alterações.
4. Faça commit das alterações: `git commit -m "Adiciona minha contribuição"`.
5. Faça push da branch: `git push origin minha-contribuicao`.
6. Crie um pull request.

## Contato 📬

Para entrar em contato com os desenvolvedores ou reportar problemas, você pode enviar um e-mail para arleirocha24@gmail.com ou visitar [meu perfil no LinkedIn](https://www.linkedin.com/in/arleipr/).

## Agradecimentos 🙏

Agradeço à Cubos Academy por fornecer a oportunidade de realizar este projeto e pelo crescimento significativo em nosso conhecimento.
