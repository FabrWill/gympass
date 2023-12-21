<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


# Payments

Serviço de pagamentos do ecommerce que deve ser utilizado para transformar os dados da requisição em dados utilizados pelo innpay, retorna a confirmação de pagamento e salva dados como arquivo do boleto para consulta

## Sumário
- [Instalação](#install)
  - [Pré-requisitos](#preinstall)
  - [Instalação Local](#local)
  - [Instalação com Docker](#docker)
- [Funcionalidades](#functionalities)
  - [Boleto](#boleto)
  - [PIX](#pix)
  - [Cartão de Crédito](#credit-card)
  - [Innpay](#innpay)

## Instalação
<div id="install"></div>

### Pré-requisitos
<div id="preinstall"></div>

```
Versão do node: 14.08 ou superior
```

Antes de iniciar a instalação, verifique se a versão mínima requerida do Node.js está instalada no seu sistema.

### Instalação Local
<div id="local"></div>
1. Clone o repositório do projeto em seu ambiente local.

```
git clone [URL do Repositório]
```

2. Instale as dependências do projeto com:

```
npm install
```

3. Inicie o serviço localmente com:

```
npm run dev
```

### Instalação com Docker
<div id="docker"></div>
Para instalar e rodar o serviço utilizando Docker, execute:

```bash
docker-compose up -d
```

## Funcionalidades
<div id="functionalities"></div>

Todos os pagamentos que vão para o innpay ao serem retornados com sucesso geram 3 campos na tabela ZK1
`ZK1_ZMPGIT` = identificação da transação no INNPAY e no Banco, para boletos esse dado é conhecido como **nosso número**.

`ZK1_ZMPGID` = informação da transação, código de barra ou qrcode do PIX, ou código de sucesso do cartão

### Boleto
<div id="boleto"></div>

O módulo de payments contém um submodule de boleto onde é possível registrar boletos no innpay

S3:
Os boletos são registrados e salvos no S3 da innova numa pasta `boleto/` com o nome sendo o campo `ZK1_ZMPGIT` **nosso número**
consulte mais informações sobre acesso e nome de buckets com o time da innova

para boletos é necessário registrar os seguintes dados:
`ZK1_ZPGAGE` = agência
`ZK1_ZPGCTA` = conta
`ZK1_ZPGBCO` = banco


### PIX
<div id="pix"></div>

O PIX é um método de pagamento mais fácil de integrar poucos dados são necessários e o retorno é simples. no controlador de criação do submodulo de pix haverá apenas a necessidade de pegar o usuário conectado através do decorator `@AuthUser`

### Cartão de Crédito
<div id="credit-card"></div>

Nossa solução para pagamentos com cartão de crédito oferece suporte a várias bandeiras e permite transações seguras com autorização em tempo real, além de funcionalidades de pagamento recorrente e armazenamento de cartões com tokenização.

### Innpay
<div id="innpay"></div>

Innpay é um método de pagamento integrado pela innova.
ele oferece a ponte entre cliente e banco sem a necessidade de homologação das requisições com o banco (processo que pode levar 1 mês ou mais)

apesar disso é importante mapear e retornar todos os dados no formato que seu banco pedem pois o innpay apenas faz o repasse dos dados.

para saber como atender melhor o Banco do Brasil na KFG você pode acessar a documentação: 
[Documentação de Testes Banco do Brasil(PIX, BOLETO)](https://apoio.developers.bb.com.br/referency/post/5f4fb7f5b71fb5001268ca44)

[Docuemntação de Testes ERede (Crédito)](https://github.com/DevelopersRede/erede-php)