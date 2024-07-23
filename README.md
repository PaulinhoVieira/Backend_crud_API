# Projeto Marcelão

> Gerar o json
> 

```bash
npm init -y 
```

> Instalando as bibliotecas necessarias para a aplicação
> 

```bash
npm install express mysql body-parser jsonwebtoken crypto --save 
```

> Url: [http://localhost:3000/user](http://localhost:3000/user)
> 

> GET (consulta tudo) → Saida
> 

```json
{
"id": 1,
"nome": "paulo",
"email": "[soeupfv@hotmail.com](mailto:soeupfv@hotmail.com)",
"data_criacao": "2024-07-11T03:00:00.000Z"
},
{
"id": 4,
"nome": "livia",
"email": "[livia@hotmail.com](mailto:livia@hotmail.com)",
"data_criacao": "2024-07-22T03:00:00.000Z"
},
{
"id": 5,
"nome": "davi",
"email": "[davi@hotmail.com](mailto:davi@hotmail.com)",
"data_criacao": "2024-07-22T03:00:00.000Z"
}
```

> GET (consulta especifica pelo id) → [http://localhost:3000/user/id](http://localhost:3000/user/id)
> 

saida(usamos o campo a cima o id = 5):

```json
{
"id": 5,
"nome": "davi",
"email": "davi@hotmail.com",
"data_criacao": "2024-07-22T03:00:00.000Z"
}

```

> PUT (atualiza  pelo campo id) → [http://localhost:3000/user/id](http://localhost:3000/user/id)  entrada:
> 

```json
{
"nome": "davi",
"email": "davi@hotmail.com",
"senha": "davi123"
}
```

> delete (deleta o user pelo id)→ [http://localhost:3000/user/id](http://localhost:3000/user/id)
> 

fala que foi deletado com sucesso!

> POST (adicionar novo usuario) - entrada:
> 

```json
{
"nome": "davi",
"email": "davi@hotmail.com",
"senha": "davi123"
}
```

Url: [http://localhost:3000/login](http://localhost:3000/login)

> POST → login (entrada)
> 

```json
{
"email": "davi@hotmail.com",
"senha": "davi123"
}

saida:

{
"acessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21lIjoiZGF2aSIsImVtYWlsIjoiZGF2aUBob3RtYWlsLmNvbSIsImlhdCI6MTcyMTcwMTU3MiwiZXhwIjoxNzIxNzAzNTcyfQ.fCctAqKbuY2B8JCWiIeNIxjjVKGC0PK_137li5YCT04"
}
```
