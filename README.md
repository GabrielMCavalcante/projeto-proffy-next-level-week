# Projeto Proffy

## Objetivo

<p>Aprender tecnologias mais utilizadas no mercado como React e React Native, NodeJS e muito mais.</p>

## O que é

<p>Este projeto faz parte da Next Level Week 2.0 da Rocketseat, que consiste em uma série de 5 vídeo-aulas ensinando a como trabalhar com as tecnologias mais utilizadas no mercado, tudo na prática. Neste repositório estão os arquivos tanto do frontend quanto do backend da aplicação, assim como a versão mobile.
<p>A aplicação consiste em um sistema para estudantes e professores interagirem entre si, onde os estudantes podem visualizar o que cada professor cadastrado ensina, assim como saber um pouco mais sobre ele.</p>

### Tecnologias utilizadas

- React
- React Native
- Expo
  - AsyncStorage
- Node
  - Express
  - Knex com SQLite3
  - Axios
  - Cors
</br>

## Sumário

- [Instalação](#instalação)
  - [Configurando os arquivos do projeto](#configurando-os-arquivos-do-projeto)
  - [Servidor](#servidor)
  - [Aplicação Web](#aplicação-web)
  - [Aplicação Mobile](#aplicação-mobile)
- [Imagens do projeto](#imagens-do-projeto)
- [Sobre](#sobre)

[Voltar ao topo](#projeto-proffy)

## Instalação

### Configurando os arquivos do projeto
Para instalar o projeto da aplicação em sua máquina, siga os passos a seguir:

0. Antes de tudo, verifique se você tem instalado em sua máquina o NPM ou YARN;
1. Clone este repositório;
1. Abra o terminal de sua preferência na pasta do repositório clonado;
1. Usuários NPM: execute `npm install` | Usuários YARN: execute `yarn add` para instalar todas as dependências do projeto.

### Servidor
Agora que você possui todos os arquivos necessários para rodar o projeto, primeiro você deve iniciar o servidor backend da aplicação, seguindo os passos abaixo:

1. Na pasta `server`: usuários NPM: execute `npm run knex:migrate` | usuários YARN: execute `yarn knex:migrate` para configurar o banco de dados da aplicação;
1. Após o banco de dados ser configurado: usuários NPM: execute `npm start` | usuários YARN: execute `yarn start` para rodar o servidor na porta 3333.

Com o servidor rodando, agora você pode escolher entre rodar a versão web ou mobile da aplicação, seguindo os passos a seguir:

### Aplicação Web
Apenas entre na pasta `web`, abra o terminal e execute: usuários NPM: `npm start` | usuários YARN: `yarn start` para rodar a aplicação.

### Aplicação Mobile
1. Para rodar a aplicação mobile, você deve fazer o download do expo em seu dispositivo móvel ou em um emulador;
1. Com o expo instalado, entre na pasta `mobile` e abra o terminal;
1. Usuários NPM: execute `npm start` | Usuários YARN: execute `yarn start` para iniciar o servidor expo da aplicação;
1. Abra o aplicativo do expo no seu celular ou emulador e abra o projeto iniciado na etapa anterior utilizando o QRCode ou digitando o endereço ip do servidor.

> IMPORTANTE: antes de iniciar a aplicação mobile, configure para que o endereço ip da aplicação esteja de acordo com a conexão de internet que está utilizando!
Para fazer isso, siga os passos a seguir:

1. Na pasta `mobile`, acesse o arquivo localizado em `src/axios-config.ts`;
1. Dentro do arquivo, altere o endereço ip antes da porta 3333 para o seu endereço ip.

[Voltar ao sumário](#sumário)
[Voltar ao topo](#projeto-proffy)

## Imagens do projeto

### Versão Web

- <p>Página da home</p>
IMAGEM AQUI
- <p>Página de cadastro</p>
IMAGEM AQUI

### Versão Mobile

- <p>Tela da home</p>
IMAGEM AQUI

- <p>Tela do mapa de pontos de coleta</p>
IMAGEM AQUI

- <p>Tela de detalhes do ponto de coleta selecionado</p>
IMAGEM AQUI

[Voltar ao sumário](#sumário)
[Voltar ao topo](#projeto-proffy)


## Sobre

- Github - [GabrielMCavalcante](https://github.com/GabrielMCavalcante)

- LinkedIn - [Gabriel Cavalcante](https://linkedin.com/in/gabrielmcavalcante)

[Voltar ao sumário](#sumário)
[Voltar ao topo](#projeto-proffy)
