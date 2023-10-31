# FIAP SOAT - Grupo 34 - Tech Challenge #01

Repositório do Tech Challenge #01 da FIAP/Alura, no curso SOAT3. Foram utilizadas técnicas de DDD e Arquitetura Hexagonal para realizar o desenvolvimento da Aplicação.

### Documentação (DDD)

Para realizar a documentação do DDD, criamos um documento no [Notion](https://notion.so) para centralizar e organizar melhor os entregáveis e processos envolvidos, é possível realizar o acesso deste documento clicando [aqui](https://www.notion.so/samirelhassann/Tech-Challenge-Fase-1-2e8703958c88412ba9cdf97b56815442).

### Como rodar a aplicação?

Pré-requisitos:

- Docker instalado e funcional na máquina, para conseguir gerar os containers com sucesso.

A geração da camada de API e Banco de Dados é feita automaticamente utilizando o comando `yarn setup`. Ele irá gerar os containers necessários para rodar a aplicação, assim como aplicar os migrations dentro do banco de dados.  
A aplicação estará disponível, por padrão, na rota [`http://localhost:3333`](http://localhost:3333).

### Documentação (API)

Ao rodar o projeto é possível acessar com o endpoint `/docs` a documentação completa no [Redoc](https://github.com/Redocly/redoc) ou em `/docs-swagger` para a visualização do [Swagger](swagger.io) padrão.

### Membros

- [Bruno De Masi](github.com/brunodmsi)
- [Gabriel Almeida](github.com/gabrielgqa)
- [Leandro Arzolla Coelho](github.com/leandrocoelho1)
- [Samir El Hassan](github.com/samirelhassann)
