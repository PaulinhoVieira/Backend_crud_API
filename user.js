const express = require('express');
const routerUser = express.Router();
const dbconn = require('./conexao.js');
const encripitarSenha = require('./encriptacao.js');

routerUser.get('/', (req, res) => {
  const sql = 'SELECT id, nome, email, data_criacao FROM usuarios';
  dbconn.query(sql, (erro, linhas) => {
    if (erro) {
      console.log(erro);
    }else{
      res.json(linhas);
    }
  })
});

routerUser.get('/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT id, nome, email, data_criacao FROM usuarios WHERE id = ?';
  dbconn.query(sql, [id],(erro,  linhas) => {
    if (erro) {
      console.log(erro);
    }else{
      if (linhas.length > 0) {
        res.json(linhas[0]);
      } else {
        res.status(404).send('Registro não encontrado!');
      }
    }
  })
});

routerUser.post('/', (req, res) =>{
  const date = new Date();
  const nome = req.body.nome;
  const email = req.body.email;
  const senha = encripitarSenha(req.body.senha);
  
  const data_criacao = date;
  const sql = 'INSERT INTO usuarios(nome, email, senha, data_criacao) VALUES (?, ?, ?, ?)';
  dbconn.query(sql, [nome, email, senha, data_criacao], (erro, linhas) => {
    if (erro) {
      console.log(erro);
      res.status(400).send(erro.message);
  } else {
      res.status(201).send('User cadastrado com sucesso.');
  }
  });
})
 routerUser.put('/:id', (req, res) => {
  const id = req.params.id;
  const nome = req.body.nome;
  const email = req.body.email;
  const senha = encripitarSenha(req.body.senha);
  
  const sql = 'update usuarios SET nome = ?, email = ?, senha = ? where id = ?';
  dbconn.query(sql, [nome, email, senha, id], (erro, linhas) => {
    if(erro){
      console.log(erro);
      res.status(400).send(erro.message);
    }else{
      if(linhas.affectedRows > 0){
        res.status(200).send('User atualizado com sucesso!');
      }else{
        res.status(404).send('Registro não localizado');
      }
    }
  })
 });

routerUser.delete('/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'DELETE FROM usuarios WHERE id = ?';

  dbconn.query(sql, [id], (erro, linhas) => {
    if (erro) {
      console.log(erro);
      res.status(400).send(erro.message);
  } else {
      if (linhas.affectedRows > 0) {
          res.status(200).send('Registro excluído com sucesso.');
      } else {
          res.status(404).send('Registro não localizado');
      }
  }
  });
});

module.exports = routerUser;