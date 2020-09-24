<p align="center"><img src="github/icon.png" width="100" height=100 alt="App Logo"/></p>

# Projeto Proffy

![Imagem principal - Proffy](github/Web/menu.png)

## Objetivo

<p>Aprender tecnologias mais utilizadas no mercado como React e React Native, NodeJS e muito mais.</p>

## O que é

<p>Este projeto faz parte da Next Level Week 2.0 da Rocketseat, que consiste em uma série de 5 vídeo-aulas ensinando a como trabalhar com as tecnologias mais utilizadas no mercado, tudo na prática. Neste repositório estão os arquivos tanto do frontend quanto do backend da aplicação, assim como a versão mobile.
<p>A aplicação consiste em um sistema para estudantes e professores interagirem entre si, onde os estudantes podem visualizar o que cada professor cadastrado ensina, assim como saber um pouco mais sobre ele.</p>

## Atualização
<p>O projeto sofreu uma atualização por conta dos desafios propostos ao final do evento da Next Level Week 2.0, sendo adicionadas as seguintes funcionalidades:</p>

> Layout
- Refeito layout da versão web
- Refeito layout da versão mobile

> Autenticação de usuários
- Login
- Cadastro
- Recuperação de senha
- Lembrar usuário no próximo acesso

> Perfil de usuário
- Possibilidade de editar informações como a biografia e o número de telefone
- Possibilidade de remover aula cadastrada e se tornar estudante
- Possibilidade de alterar a foto do perfil

> Listagem de Proffys
- Agora os horários de cada Proffy aparece em seu cartão proffy
- Melhorias na filtragem de Proffys
- Adicionado paginação e rolagem infinita para melhor performance e experiência de usuário

> Proffys favoritos (apenas mobile)
- Agora os favoritos são salvos no banco de dados e não mais no AsyncStorage do dispositivo móvel

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

[Voltar ao sumário](#sumário) <br/>
[Voltar ao topo](#projeto-proffy)

## Imagens do projeto

### Versão Web

#### Página de login
  <img src="github/Web/login.png" alt="Página de login" />
  
  
#### Página de cadastro
  <img src="github/Web/cadastro.png" alt="Página de cadastro" />


#### Página de 'Esqueci a Senha'
  <img src="github/Web/esqueceu-senha.png" alt="Página de Esqueci a Senha" />


#### Página da home
  <img src="github/Web/menu.png" alt="Página da home" />


#### Página de cadastro de aula
  <img src="github/Web/dar-aulas.png" alt="Página de cadastro de aula" />


#### Página de listagem de proffys
  <img src="github/Web/estudar.png" alt="Página de listagem de proffys" />


#### Cartão proffy
  <img src="github/Web/cartao-proffy.png" alt="Cartão proffy" />
  
  
#### Página do perfil
  <img src="github/Web/perfil.png" alt="Página do perfil" />

### Versão Mobile

#### Telas de onboarding
  <img src="github/Mobile/onboarding1.jpeg" alt="Onboarding #1" width=300/> <img src="github/Mobile/onboarding2.jpeg" alt="Onboarding #2" width=300/>


#### Tela de login
  <img src="github/Mobile/login.jpeg" alt="Página de login" width=300/>
  
  
#### Tela de cadastro
  <img src="github/Mobile/cadastro.jpeg" alt="Página de cadastro" width=300/>
  

#### Tela de 'Esqueci a Senha'
  <img src="github/Mobile/esqueceu-senha.jpeg" alt="Página de esqueci a senha" width=300/>


#### Tela da home
  <img src="github/Mobile/menu.jpeg" alt="Tela da home" width=300/>


#### Tela de cadastro de aula
  <img src="github/Mobile/dar-aulas.jpeg" alt="Tela de cadastro de aula" width=300/>


#### Tela de listagem de proffys
  <img src="github/Mobile/estudar.jpeg" alt="Tela de listagem de proffys" width=300/>


#### Tela de listagem de proffys favoritos
  <img src="github/Mobile/favoritos.jpeg" alt="Tela de listagem de proffys favoritos" width=300/>


#### Cartão proffy
  <img src="github/Mobile/cartao-proffy.jpeg" alt="Cartão proffy" width=300/>
  
#### Tela do perfil
  <img src="github/Mobile/perfil.jpeg" alt="Tela do perfil" width=300/>

[Voltar ao sumário](#sumário) <br/>
[Voltar ao topo](#projeto-proffy)


## Sobre

- Github - [GabrielMCavalcante](https://github.com/GabrielMCavalcante)

- LinkedIn - [Gabriel Cavalcante](https://linkedin.com/in/gabrielmcavalcante)

[Voltar ao sumário](#sumário) <br/>
[Voltar ao topo](#projeto-proffy)
