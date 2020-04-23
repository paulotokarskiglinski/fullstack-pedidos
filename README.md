# FullstackPedidos

Sistema de controle de pedidos. De forma simples, cadastre, remova, edite e controle os seus pedidos.

# Este projeto utiliza: 

[Express](https://expressjs.com) versão 4.16.0<br>
[Angular](https://angular.io) versão 9.1.3

## Development server

Para executar localmente esta aplicação, abra uma primeira guia do terminal e execute o comando `npm start` para iniciar o servidor NodeJS da API. Em uma segunda aba do terminal execute o comando `npm run-script app` para inicial a aplicação em Angular.

Acesse a aplicação em `http://localhost:4200` e a API em `http://localhost:3000`

## Build e Deploy

Para fazer o deploy desta aplicação no [Heroku](https://heroku.com), primeiro realize o commit das alterações no [GitHub](https://github.com/paulotokarski/fullstack-pedidos) e, de forma manual, execute o Deploy do Branch no painel da aplicação.

## Testes

Execute o comando `ng test` para realizar os testes através do [Karma](https://karma-runner.github.io).

Os seguintes testes estão previstos:
<ul>
  <li>Verifica a existência do formulário de cadastro na página;</li>
  <li>Verifica a existência do formulário de edição na página;</li>
  <li>Testes de conexão com API.</li>
</ul>


## Mais Ajuda

Execute o comando `ng help` no terminal ou verifique a documentação [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
