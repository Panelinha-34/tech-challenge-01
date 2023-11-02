# FIAP SOAT - Grupo 34 - Tech Challenge #01

Repositório do Tech Challenge #01 da FIAP/Alura, no curso SOAT3. Foram utilizadas técnicas de DDD e Arquitetura Hexagonal para realizar o desenvolvimento da Aplicação.

# Documentação (DDD)

Para realizar a documentação do DDD, criamos um documento no [Notion](https://notion.so) para centralizar e organizar melhor os entregáveis e processos envolvidos, é possível realizar o acesso deste documento clicando [aqui](https://samirelhassann.notion.site/Documenta-o-Tech-Challenge-1-Grupo-34-bf92a1a97de5400abfaef9e0b6bcd0e2?pvs=4)



# Como rodar a aplicação?

### Utilizando Docker

Pré-requisitos:

- Docker instalado e funcional na máquina, para conseguir gerar os containers com sucesso.

Rode o seguinte comando no root do projeto:
```bash
docker-compose up -d
```

A geração da camada de API e Banco de Dados será feita automaticamente. Ele irá gerar os containers necessários para rodar a aplicação, assim como aplicar os migrations dentro do banco de dados.  

A aplicação estará disponível, por padrão, na rota [`http://localhost:3333`](http://localhost:3333).

### Rodando Localmente

Caso queira rodar localmente, sem utilizar o docker:

1. Instale as dependências
```bash
yarn install
```

2. Atualize o prisma
```bash
yarn prisma generate && yarn prisma migrate dev
```

3. Inicialize a aplicação
```bash
yarn dev
```

A aplicação estará disponível, por padrão, na rota [`http://localhost:3333`](http://localhost:3333).

# Documentação (API)

Ao rodar o projeto é possível acessar com o endpoint `/docs` a documentação completa no [Redoc](https://github.com/Redocly/redoc) ou em `/docs-swagger` para a visualização do [Swagger](swagger.io) padrão.

### Membros

- [Bruno De Masi](github.com/brunodmsi)
- [Gabriel Almeida](github.com/gabrielgqa)
- [Leandro Arzolla Coelho](github.com/leandrocoelho1)
- [Samir El Hassan](github.com/samirelhassann)
